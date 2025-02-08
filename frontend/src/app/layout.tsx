import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Notes App",
    description: "A simple note-taking app with authentication",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </AuthProvider>
    );
}
