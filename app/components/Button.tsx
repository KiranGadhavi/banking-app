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
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold sm:py-2 sm:px-4 sm:my-4 sm:text-sm xs:text-xs xs:p-1 rounded ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
