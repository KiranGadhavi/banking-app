"use client"; // Ensure this is at the very top

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaCog,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const HeaderComponent = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleMenu = () => {
    console.log("Menu toggled"); // Debug line to check if toggleMenu is called
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const menuItems = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/account-overview", label: "Account Overview", icon: FaUser },
    {
      href: "/transaction-forms",
      label: "Transaction Forms",
      icon: FaCalendarAlt,
    },
    { href: "/transaction-history", label: "Transaction History", icon: FaCog },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-500 dark:text-blue-300">
              Banking App
            </span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300 ease-in-out pb-1 ${
                  pathname === href
                    ? "border-b-2 border-blue-500 dark:border-blue-300 text-blue-500 dark:text-blue-300"
                    : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <button
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-400" />
            )}
          </button>

          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="text-2xl">{isMenuOpen ? "✖️" : "☰"}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          {menuItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center space-x-2 px-4 py-3 transition-all duration-300 ease-in-out ${
                pathname === href
                  ? "border-l-4 border-blue-500 dark:border-blue-300 bg-blue-50 dark:bg-gray-700"
                  : "hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => {
                toggleMenu(); // Close the menu when clicked
                setIsMenuOpen(false); // Ensure it closes on click
              }}
            >
              <Icon
                className={`transition-colors duration-300 ease-in-out ${
                  pathname === href
                    ? "text-blue-500 dark:text-blue-300"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <span
                className={`transition-colors duration-300 ease-in-out ${
                  pathname === href ? "text-blue-500 dark:text-blue-300" : ""
                }`}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default HeaderComponent;
