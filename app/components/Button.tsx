"use client";
import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}
export default function Button({ text, onClick, className = "" }: ButtonProps) {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
