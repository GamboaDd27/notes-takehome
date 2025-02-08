"use client";

import Link from "next/link";

interface Note {
    id: number;
    title: string;
    body: string;
    category: number;
    category_name: string;
    last_edit_time: string;
}

const categoryColors: Record<number, string> = {
    1: "bg-blue-200",  // Random Thoughts
    2: "bg-green-200", // School
    3: "bg-purple-200", // Personal
};

export default function NoteList({ notes }: { notes: Note[] }) {
    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
                <Link key={note.id} href={`/dashboard/note/${note.id}`}>
                    <div
                        className={`cursor-pointer shadow-md p-4 rounded-lg hover:shadow-lg transition ${
                            categoryColors[note.category] || "bg-gray-200"
                        }`}
                    >
                        <h3 className="text-lg font-semibold">{note.title || "Untitled"}</h3>
                        <p className="text-gray-700">{note.body.substring(0, 50)}...</p>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm text-gray-500">{note.category_name}</span>
                            <span className="text-xs text-gray-600">
                                {new Date(note.last_edit_time).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
