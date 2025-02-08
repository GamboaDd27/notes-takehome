"use client";

import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import NoteList from "../../components/NoteList";
import NewNote from "../../components/NewNote";

interface Note {
    id: number;
    title: string;
    body: string;
    category: number;
    category_name: string;
    last_edit_time: string;
}

const categoryColors: Record<number, string> = {
    1: "bg-blue-500",  // Random Thoughts
    2: "bg-green-500", // School
    3: "bg-purple-500", // Personal
};


export default function Dashboard() {
    const { token, logout } = useContext(AuthContext);
    const router = useRouter();
    const [notes, setNotes] = useState<Note[]>([]);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            router.push("/login");
            return;
        }

        axios
            .get("http://127.0.0.1:8000/api/notes/", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setNotes(res.data);
                setFilteredNotes(res.data);
                setLoading(false);
            })
            .catch(() => {
                logout();
            });
    }, [token, router, logout]);

    // Handle category selection from sidebar
    const handleCategoryChange = (categoryId: number | "all") => {
        setSelectedCategory(categoryId);
        if (categoryId === "all") {
            setFilteredNotes(notes);
        } else {
            setFilteredNotes(notes.filter((note) => note.category === categoryId));
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />

            {/* Main Content */}
            <div className="flex-1 p-6 relative">
                <h1 className="text-3xl font-bold">Your Notes</h1>

                {/* No notes placeholder */}
                {loading ? (
                    <p className="mt-4">Loading...</p>
                ) : filteredNotes.length === 0 ? (
                    <p className="mt-4 text-gray-500">No notes found in this category.</p>
                ) : (
                    <NoteList notes={filteredNotes} />
                )}

                {/* New Note Button */}
                <NewNote onNoteCreated={(newNote) => setNotes([...notes, newNote])} />
            </div>
        </div>
    );
}
