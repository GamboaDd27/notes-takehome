"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthContextType {
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(
        typeof window !== "undefined" ? localStorage.getItem("token") : null
    );
    const [refreshToken, setRefreshToken] = useState<string | null>(
        typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null
    );
    const router = useRouter();

    const login = async (username: string, password: string) => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/token/", { username, password });
            localStorage.setItem("token", res.data.access);
            localStorage.setItem("refreshToken", res.data.refresh);
            setToken(res.data.access);
            setRefreshToken(res.data.refresh);
            router.push("/dashboard");
        } catch (err) {
            throw new Error("Invalid username or password.");
        }
    };

    const refreshAccessToken = async () => {
        if (!refreshToken) {
            logout();
            return;
        }

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
                refresh: refreshToken,
            });
            localStorage.setItem("token", res.data.access);
            setToken(res.data.access);
        } catch (err) {
            console.error("Failed to refresh token:", err);
            logout();
        }
    };

    useEffect(() => {
        if (!token) return;

        // Auto-refresh token before it expires
        const refreshInterval = setInterval(refreshAccessToken, 1000 * 60 * 50); // Refresh every 50 min
        return () => clearInterval(refreshInterval);
    }, [token]);

    const logout = () => {
        setToken(null);
        setRefreshToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
