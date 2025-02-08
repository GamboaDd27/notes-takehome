"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthContext from "../../../../context/AuthContext";

interface Note {
  id: number;
  title: string;
  body: string;
  category: number;
  category_name?: string;
  last_edit_time?: string;
}

// Category colors for background and dropdown indicators
const categoryColors: Record<number, string> = {
  1: "bg-blue-200",  // Random Thoughts
  2: "bg-green-200", // School
  3: "bg-purple-200", // Personal
};

const categoryTextColors: Record<number, string> = {
  1: "text-blue-700",
  2: "text-green-700",
  3: "text-purple-700",
};

const categoryNames: Record<number, string> = {
  1: "Random Thoughts",
  2: "School",
  3: "Personal",
};

export default function NoteDetail({ params }: { params: { id: string } }) {
  const { token, logout } = useContext(AuthContext);
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/notes/${params.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNote(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching note", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
        } else {
          router.push("/dashboard");
        }
      });
  }, [params.id, token, router, logout]);

  const autoSave = async (updatedNote: Note) => {
    if (!updatedNote) return;
    setIsSaving(true);

    try {
      const payload: Partial<Note> = {};
      if (updatedNote.title.trim()) payload.title = updatedNote.title;
      if (updatedNote.body.trim()) payload.body = updatedNote.body;
      payload.category = updatedNote.category;

      const res = await axios.patch(
        `http://127.0.0.1:8000/api/notes/${updatedNote.id}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNote((prev) => {
        if (!prev) return null;
        return { ...prev, last_edit_time: res.data.last_edit_time };
      });
    } catch (err: any) {
      console.error("Error saving note", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleTyping = (field: "title" | "body" | "category", value: string | number) => {
    if (!note) return;
    const updatedNote = { ...note, [field]: value };
    setNote(updatedNote);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      autoSave(updatedNote);
    }, 1000);
  };

  const handleCategorySelect = (categoryId: number) => {
    setDropdownOpen(false);
    handleTyping("category", categoryId);
  };

  if (loading) return <p>Loading...</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className={`p-6 rounded-lg shadow-lg w-[500px] relative ${categoryColors[note.category] || "bg-gray-200"}`}>
        {/* Close Button (X) */}
        <button
          onClick={() => router.push("/dashboard")}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl"
        >
          ×
        </button>

        {/* Title Input */}
        <input
          type="text"
          value={note.title}
          placeholder="Untitled Note"
          onChange={(e) => handleTyping("title", e.target.value)}
          className={`block w-full p-2 mb-4 border border-transparent bg-transparent text-gray-900 text-2xl font-bold focus:outline-none focus:ring-0`}
        />

        {/* Body Input */}
        <textarea
          value={note.body}
          placeholder="Start typing here..."
          onChange={(e) => handleTyping("body", e.target.value)}
          className={`block w-full p-2 mb-4 border border-transparent bg-transparent text-gray-900 focus:outline-none focus:ring-0 h-40 resize-none`}
        />

        {/* Custom Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full text-left p-2 mb-4 border border-transparent text-gray-900 bg-transparent text-lg focus:outline-none flex items-center"
          >
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${categoryColors[note.category] || "bg-gray-500"}`}></span>
            {categoryNames[note.category]}
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 w-full text-gray-900 font-bold bg-white shadow-md rounded-md border border-gray-300">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  onClick={() => handleCategorySelect(id)}
                  className="p-2 flex items-center text-gray-900 hover:bg-gray-100 cursor-pointer"
                >
                  <span className={`inline-block w-3 text-gray-900 h-3 rounded-full mr-2 ${categoryColors[id]}`}></span>
                  {categoryNames[id]}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Last Edited Timestamp */}
        {note.last_edit_time && (
          <p className={`text-md font-medium ${categoryTextColors[note.category] || "text-gray-700"}`}>
            Last edited:{" "}
            <span className="font-bold">
              {new Date(note.last_edit_time).toLocaleString()}
            </span>
          </p>
        )}

        {/* Auto-Saving Indicator */}
        {isSaving && (
          <span className="text-sm text-blue-600 absolute bottom-2 right-4">
            Saving...
          </span>
        )}
      </div>
    </div>
  );
}
