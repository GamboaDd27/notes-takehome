"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

interface Category {
    id: number;
    name: string;
    count?: number; // Note count per category
}

interface SidebarProps {
    selectedCategory: number | "all";
    onSelectCategory: (categoryId: number | "all") => void;
}

const categoryColors: Record<number, string> = {
    1: "bg-blue-500",  // Random Thoughts
    2: "bg-green-500", // School
    3: "bg-purple-500", // Personal
};

export default function Sidebar({ selectedCategory, onSelectCategory }: SidebarProps) {
    const { token } = useContext(AuthContext);
    const [categories, setCategories] = useState<Category[]>([]);
    const [notes, setNotes] = useState<{ category: number }[]>([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/categories/")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Error fetching categories", err));

        axios
            .get("http://127.0.0.1:8000/api/notes/", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setNotes(res.data))
            .catch((err) => console.error("Error fetching notes", err));
    }, [token]);

    // Count notes per category
    const categoryCounts = categories.map((category) => ({
        ...category,
        count: notes.filter((note) => note.category === category.id).length,
    }));

    return (
        <div className="w-64 bg-gray-800 text-white p-6">
            <h2 className="text-xl font-bold">Categories</h2>
            <ul className="mt-4">
                {/* All Categories */}
                <li
                    onClick={() => onSelectCategory("all")}
                    className={`cursor-pointer flex items-center justify-between mb-2 p-2 rounded ${
                        selectedCategory === "all" ? "bg-blue-600" : "hover:bg-gray-700"
                    }`}
                >
                    <span className="font-semibold">All Notes</span>
                    <span className="text-gray-300">{notes.length}</span>
                </li>

                {/* Individual Categories */}
                {categoryCounts.map((category) => (
                    <li
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className={`cursor-pointer flex items-center justify-between mb-2 p-2 rounded ${
                            selectedCategory === category.id ? "bg-blue-600" : "hover:bg-gray-700"
                        }`}
                    >
                        <div className="flex items-center">
                            <span className={`w-3 h-3 rounded-full mr-2 ${categoryColors[category.id] || "bg-gray-500"}`}></span>
                            <span className="font-semibold">{category.name}</span>
                        </div>
                        <span className="text-gray-300">{category.count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
