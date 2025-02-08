"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ErrorPopup from "../../components/ErrorPopup";

export default function Signup() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/register/", credentials);
            router.push("/login");
        } catch (err: any) {
            setError(err.response?.data?.username?.[0] || "Signup failed. Try again.");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                {error && <ErrorPopup message={error} onClose={() => setError("")} />}
                <form onSubmit={handleSubmit}>
                    <input name="username" type="text" placeholder="Username" onChange={handleChange} className="block w-full p-2 mb-4 border rounded" />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} className="block w-full p-2 mb-4 border rounded" />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block w-full p-2 mb-4 border rounded" />
                    <button className="w-full bg-blue-600 text-white p-2 rounded">Sign Up</button>
                </form>
                <p className="text-center mt-4">
    Already have an account? <a href="/login" className="text-blue-600 underline">Log in</a>
</p>

            </div>
        </div>
    );
}
