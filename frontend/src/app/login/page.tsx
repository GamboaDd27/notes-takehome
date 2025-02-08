"use client";

import { useState, useContext, ChangeEvent, FormEvent } from "react";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import ErrorPopup from "../../components/ErrorPopup";

export default function Login() {
    const { login } = useContext(AuthContext);
    const router = useRouter();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
        } catch (err: any) {
            setError(err.message);
        }
    };
    

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
                {error && <ErrorPopup message={error} onClose={() => setError("")} />}
                <form onSubmit={handleSubmit}>
                    <input name="username" type="text" placeholder="Username" onChange={handleChange} className="block w-full p-2 mb-4 border rounded" />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} className="block w-full p-2 mb-4 border rounded" />
                    <button className="w-full bg-blue-600 text-white p-2 rounded">Log In</button>
                </form>
                <p className="text-center mt-4">
    No account? <a href="/signup" className="text-blue-600 underline">Create one</a>
</p>

            </div>
        </div>
    );
}
