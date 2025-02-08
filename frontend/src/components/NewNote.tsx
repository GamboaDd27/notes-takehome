"use client";

import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

interface Note {
    id: number;
    title: string;
    body: string;
    category: number;
    category_name: string;
    last_edit_time: string;
}

interface NewNoteProps {
    onNoteCreated: (note: Note) => void;
}

export default function NewNote({ onNoteCreated }: NewNoteProps) {
    const { token } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ title: "", body: "", category: 1 });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/notes/", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onNoteCreated(res.data);
            setIsOpen(false);
        } catch (err) {
            console.error("Error creating note", err);
        }
    };

    return (
        <>
            {/* New Note Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                New Note
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Create a New Note</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                required
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="block w-full p-2 mb-4 border rounded"
                            />
                            <textarea
                                name="body"
                                placeholder="Note body"
                                required
                                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                                className="block w-full p-2 mb-4 border rounded"
                            />
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Save Note</button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="ml-2 text-gray-500"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
