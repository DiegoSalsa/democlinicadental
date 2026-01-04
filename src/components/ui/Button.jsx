import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-light shadow-primary/20",
        secondary: "bg-secondary text-white hover:bg-secondary-hover shadow-secondary/20",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        white: "bg-white text-primary hover:bg-gray-50",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
