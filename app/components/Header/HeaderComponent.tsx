"use client";
import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { motion } from "framer-motion";
export default function HeaderComponent() {
  const [darkMode, setDarkMode] = useState(false);
  const text = "Welcome to your Bank!";

  // Split the text into individual letters
  const letters = text.split("");
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="p-4 flex justify-between items-center fixed w-full z-10 top-0 bg-background dark:bg-gray-900 shadow-md h-16">
      <h1 className="mx-auto text-blue-400">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -20 }} // Start from invisible and above
            animate={{ opacity: 1, y: 0 }} // Fade in and slide down
            transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger the animation
            style={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>
    </header>
  );
}
