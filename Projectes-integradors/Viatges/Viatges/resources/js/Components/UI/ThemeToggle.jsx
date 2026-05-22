import React from 'react';
import useDarkMode from '@/Hooks/useDarkMode';
import { IoMdSunny, IoMdMoon } from "react-icons/io";

export default function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme } = useDarkMode();

    return (
        <button
            onClick={toggleTheme}
            className={`relative overflow-hidden flex items-center justify-center rounded-full w-10 h-10 md:w-11 md:h-11 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-principal dark:focus:ring-secundario dark:focus:ring-offset-gray-900 border border-transparent
                ${theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700 shadow-md hover:shadow-yellow-500/20' 
                    : 'bg-white border-gray-200 shadow-sm hover:shadow-blue-500/20'
                } ${className}`}
            aria-label="Alternar tema"
            title={theme === 'dark' ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
            {/* Icono de Sol */}
            <div className={`absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                theme === 'dark' 
                    ? 'translate-y-0 opacity-100 rotate-0 text-yellow-400' 
                    : '-translate-y-8 opacity-0 rotate-90 text-yellow-500'
            }`}>
                <IoMdSunny className="w-5 h-5 md:w-6 md:h-6" />
            </div>

            {/* Icono de Luna */}
            <div className={`absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                theme === 'dark' 
                    ? 'translate-y-8 opacity-0 -rotate-90 text-blue-400' 
                    : 'translate-y-0 opacity-100 rotate-0 text-negro-azulada'
            }`}>
                <IoMdMoon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
        </button>
    );
}
