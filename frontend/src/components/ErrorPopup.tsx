"use client";

import { useState, useEffect } from "react";

interface ErrorPopupProps {
    message: string;
    onClose: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-close after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    return (
        <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
            {message}
            <button onClick={onClose} className="ml-2 text-white font-bold">×</button>
        </div>
    );
};

export default ErrorPopup;
