"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const publicNavItems = [
    { label: "Home", href: "/" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "Notes", href: "/notes" },
];

const privateNavItems = [
    { label: "Home", href: "/" },
    { label: "Profile", href: "/profile" },
    { label: "Notes", href: "/notes" },
];

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // Per menú haburguesa en pantalles petites.

    useEffect(() => {
        const read = () => setIsLoggedIn(!!localStorage.getItem("user"));
        read();
        window.addEventListener("auth-changed", read);
        window.addEventListener("storage", read);
        return () => {
            window.removeEventListener("auth-changed", read);
            window.removeEventListener("storage", read);
        };
    }, []);

    const navItems = isLoggedIn ? privateNavItems : publicNavItems;

    return (
        <header className="w-full sticky top-0 z-50 h-28 md:h-24 sm:h-20 px-4 md:px-6 flex md:grid md:grid-cols-3 items-center border-orange-500 border-2 bg-orange-300">
            {/* Logo */}
            <Image
                src="/LEGO_logo.svg"
                alt="LEGO logo"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20"
                priority
            />

            {/* Menu hamburguesa (mòbil) */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden justify-self-end text-xl font-bold ml-4"
                aria-label="Obrir menú"
            >
                ☰
            </button>
            {/* Navegació desktop */}
            <nav className="hidden md:flex justify-self-center h-full items-center justify-center">
                <ul className="flex gap-6 h-full items-center justify-center">
                    {navItems.map(({ label, href }) => (
                        <li key={href} className="h-full items-center justify-center flex">
                            <Link
                                href={href}
                                className="font-medium hover:underline p-6 h-full flex items-center text-sm"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Menú mòbil */}
            {menuOpen && (
                <nav className="absolute top-full left-0 right-0 bg-orange-300 md:hidden border-b-2 border-orange-500">
                    <ul className="flex flex-col gap-2 p-4">
                        {navItems.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="block font-medium hover:underline p-3 text-sm"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;
