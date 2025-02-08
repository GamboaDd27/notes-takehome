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
    category_name: string;
    last_edit_time: string;
}

export default function Dashboard() {
    const { token, logout } = useContext(AuthContext);
    const router = useRouter();
    const [notes, setNotes] = useState<Note[]>([]);
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
                setLoading(false);
            })
            .catch(() => {
                logout();
            });
    }, [token, router, logout]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 relative">
                <h1 className="text-3xl font-bold">Your Notes</h1>
                {loading ? (
                    <p className="mt-4">Loading...</p>
                ) : notes.length === 0 ? (
                    <p className="mt-4 text-gray-500">No notes yet. Click "New Note" to add one.</p>
                ) : (
                    <NoteList notes={notes} />
                )}
                <NewNote onNoteCreated={(newNote) => setNotes([...notes, newNote])} />
            </div>
        </div>
    );
}
