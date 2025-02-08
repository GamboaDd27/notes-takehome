"use client";

interface Note {
    id: number;
    title: string;
    body: string;
    category_name: string;
    last_edit_time: string;
}

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    return (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
                <div key={note.id} className="bg-white shadow-md p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <p className="text-gray-600">{note.body}</p>
                    <p className="mt-2 text-sm text-gray-500">Category: {note.category_name}</p>
                    <p className="text-xs text-gray-400">Last Edited: {new Date(note.last_edit_time).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}
