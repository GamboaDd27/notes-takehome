"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

interface Category {
    id: number;
    name: string;
}

export default function Sidebar() {
    const { token } = useContext(AuthContext);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/categories/")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Error fetching categories", err));
    }, []);

    // Color map for categories
    const categoryColors: Record<string, string> = {
        "Random Thoughts": "bg-blue-500",
        School: "bg-green-500",
        Personal: "bg-purple-500",
    };

    return (
        <div className="w-64 bg-gray-800 text-white p-6">
            <h2 className="text-xl font-bold">Categories</h2>
            <ul className="mt-4">
                {categories.map((category) => (
                    <li key={category.id} className="mb-2">
                        <span
                            className={`inline-block w-4 h-4 rounded-full mr-2 ${
                                categoryColors[category.name] || "bg-gray-500"
                            }`}
                        ></span>
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
