'use client'

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export const ThemeContext = () =>  {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <div
      onClick={toggleTheme}
      className="flex items-center justify-center gap-2 border-2 border-[var(--color-accent-light)] justify-center p-2 rounded-tl-md rounded-br-md cursor-pointer"
    >
      {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
    </div>
  );
}
