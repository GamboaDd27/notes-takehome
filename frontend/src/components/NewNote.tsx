"use client";

import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function NewNote() {
    const { token } = useContext(AuthContext);
    const router = useRouter();

    const handleCreateNote = async () => {
        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/notes/",
                {
                    title: "Untitled Note",
                    body: "Start typing here...",
                    category: 1, // Default category (Random Thoughts)
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            router.push(`/dashboard/note/${res.data.id}`); // Redirect to edit page
        } catch (err) {
            console.error("Error creating note", err);
        }
    };

    return (
        <button
            onClick={handleCreateNote}
            className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
            New Note
        </button>
    );
}
