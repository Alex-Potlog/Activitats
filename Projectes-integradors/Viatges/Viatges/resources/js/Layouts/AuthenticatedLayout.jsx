import Dropdown from '@/Components/UI/Dropdown';
import NavLink from '@/Components/UI/NavLink';
import ResponsiveNavLink from '@/Components/UI/ResponsiveNavLink';
import { FaHome } from 'react-icons/fa';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ThemeToggle from '@/Components/UI/ThemeToggle';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-blanco-crema transition-colors duration-300 dark:bg-negro-azulada">
            <nav className="border-b border-gris-ceniza/20 bg-white transition-colors duration-300 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex shrink-0 items-center">
                                <NavLink
                                    href={route('welcome')}
                                    aria-label="Home"
                                    title="Home"
                                >
                                    <img
                                        src="/logoBueno.svg"
                                        alt="Logo"
                                        className="h-10 w-auto object-contain transition-all duration-500 dark:brightness-0 dark:invert"
                                    />
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                                {user.is_admin && (
                                    <NavLink
                                        href={route('admin.index')}
                                        active={route().current('admin.*')}
                                    >
                                        Administració
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden gap-4 sm:ms-6 sm:flex sm:items-center">
                            <ThemeToggle />
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium leading-4 text-gris-ceniza transition-colors duration-300 ease-in-out hover:text-azul-medianoche focus:outline-none dark:text-gris-plata dark:hover:text-blanco-crema"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Tancar Sessió
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center gap-2 sm:hidden">
                            <ThemeToggle />
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gris-ceniza transition-colors duration-300 ease-in-out hover:bg-principal/5 hover:text-azul-medianoche focus:bg-principal/5 focus:text-azul-medianoche focus:outline-none dark:text-gris-plata dark:hover:bg-secundario/10 dark:hover:text-blanco-crema dark:focus:bg-secundario/10 dark:focus:text-blanco-crema"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'hidden'
                                                : 'inline-flex'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        {user.is_admin && (
                            <ResponsiveNavLink
                                href={route('admin.index')}
                                active={route().current('admin.*')}
                            >
                                Administració
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-gris-ceniza/20 pb-1 pt-4 dark:border-gris-ceniza/10">
                        <div className="px-4">
                            <div className="text-base font-medium text-azul-medianoche dark:text-blanco-crema">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gris-ceniza dark:text-gris-plata">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Tancar Sessió
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
