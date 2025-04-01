import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = "primary" }) => {
    return (
        <button
            className={`w-full px-4 py-2 rounded cursor-pointer transition 
                ${variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-100"}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
