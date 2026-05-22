import { useState } from 'react';
import { LuPlane, LuFlower2, LuCoffee, LuMenu, LuX } from 'react-icons/lu';
import { Link, usePage, router } from '@inertiajs/react';
import { VscAccount } from 'react-icons/vsc';
import { FaHouse } from 'react-icons/fa6';
import ThemeToggle from '@/Components/UI/ThemeToggle';

export default function PanelLayout({ children }) {
    const { auth, categories = [], selectedCategories = [] } = usePage().props;
    let createButton = null;

    if (auth.user) {
        createButton = (
            <Link
                href={route('experiencies.create')}
                className="mb-2 flex items-center justify-center gap-2 bg-principal px-6 py-2.5 font-semibold text-blanco-crema shadow-md shadow-principal/20 transition-all hover:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:shadow-none dark:hover:bg-oro-mostaza"
            >
                <span>Crear experiència</span>
            </Link>
        );
    } else {
        createButton = (
            <Link
                href={route('login')}
                className="mb-2 flex items-center justify-center gap-2 bg-principal px-6 py-2.5 font-semibold text-blanco-crema shadow-md shadow-principal/20 transition-all hover:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:shadow-none dark:hover:bg-oro-mostaza"
            >
                <span>Crear experiència</span>
            </Link>
        );
    }
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-blanco-crema transition-colors duration-500 ease-in-out dark:bg-negro-azulada">
            {/* Overlay para móviles */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar / Menú Lateral */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col bg-blanco-crema transition-all duration-300 ease-in-out dark:bg-negro-azulada lg:relative lg:w-1/4 lg:translate-x-0 lg:border-r lg:border-gris-ceniza/20 dark:lg:border-gris-ceniza/10 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl dark:shadow-none lg:shadow-none`}
            >
                {/* Botón Cerrar (solo móvil) */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute right-6 top-6 z-10 text-gris-ceniza transition-colors hover:text-azul-medianoche focus:outline-none dark:text-gris-plata dark:hover:text-blanco-crema lg:hidden"
                    aria-label="Cerrar menú"
                >
                    <LuX className="text-2xl" />
                </button>

                <div className="relative flex justify-center p-8">
                    <div className="absolute left-6 top-8 hidden lg:block">
                        <ThemeToggle />
                    </div>
                    <div className="group flex flex-col items-center">
                        <Link
                            href={route('welcome')}
                            aria-label="Anar a l'inici"
                            title="Anar a l'inici"
                        >
                            <img
                                className="h-12 w-auto object-contain transition-all duration-500 dark:brightness-0 dark:invert"
                                src="/logoBueno.svg"
                                alt="Nómada"
                            />
                        </Link>
                        <h2 className="mt-2 text-xl font-bold text-principal transition-colors duration-500 dark:text-secundario">
                            Nómada
                        </h2>
                    </div>
                </div>

                <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-6">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="mb-2 flex items-center justify-center gap-2 bg-principal px-6 py-2.5 font-semibold text-blanco-crema shadow-md shadow-principal/20 transition-all hover:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:shadow-none dark:hover:bg-oro-mostaza"
                        >
                            <FaHouse className="text-xl" />
                            <span>El meu perfil</span>
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="mb-2 flex items-center justify-center gap-2 bg-principal px-6 py-2.5 font-semibold text-blanco-crema shadow-md shadow-principal/20 transition-all hover:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:shadow-none dark:hover:bg-oro-mostaza"
                            >
                                <VscAccount className="text-xl" />
                                <span>Accedir</span>
                            </Link>
                        </>
                    )}

                    {createButton}

                    <hr className="border-gris-ceniza/20 transition-colors duration-500 dark:border-gris-ceniza/10" />
                    {categories.length > 0 && (
                        <nav className="flex min-h-0 flex-1 flex-col py-6">
                            <h4 className="mb-4 px-4 text-sm font-semibold uppercase tracking-wide text-principal transition-colors dark:text-secundario">
                                Categories
                            </h4>
                            <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
                                {categories.map((cat) => {
                                    const isActive =
                                        selectedCategories.includes(cat.id);
                                    return (
                                        <button
                                            type="button"
                                            key={cat.id}
                                            onClick={() => {
                                                const next = isActive
                                                    ? selectedCategories.filter(
                                                          (id) => id !== cat.id,
                                                      )
                                                    : [
                                                          ...selectedCategories,
                                                          cat.id,
                                                      ];
                                                const params = {
                                                    ...route().params,
                                                };
                                                delete params.page;
                                                router.get(
                                                    route('welcome'),
                                                    {
                                                        ...params,
                                                        categories: next.length
                                                            ? next
                                                            : undefined,
                                                    },
                                                    {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    },
                                                );
                                            }}
                                            className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors duration-300 ${
                                                isActive
                                                    ? 'bg-principal/10 font-semibold text-principal dark:bg-secundario/20 dark:text-secundario'
                                                    : 'text-gris-ceniza hover:bg-principal/5 hover:text-principal dark:text-gris-plata dark:hover:bg-secundario/10 dark:hover:text-secundario'
                                            }`}
                                        >
                                            <span className="text-lg font-medium">
                                                {cat.nom}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="mx-4 mt-3 h-10 shrink-0">
                                {selectedCategories.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const rest = { ...route().params };
                                            delete rest.categories;
                                            delete rest.page;
                                            router.get(route('welcome'), rest, {
                                                preserveState: true,
                                                preserveScroll: true,
                                            });
                                        }}
                                        className="flex h-full w-full items-center justify-center gap-2 px-4 py-2 text-sm text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        <LuX className="text-lg" />
                                        <span>Limpiar filtros</span>
                                    </button>
                                )}
                            </div>
                        </nav>
                    )}
                </div>
            </aside>

            {/* Contenido Principal */}
            <div className="flex w-full flex-1 flex-col overflow-hidden">
                {/* Cabecera / Navbar (solo móvil) */}
                <header className="z-30 flex items-center justify-between border-b border-gris-ceniza/20 bg-blanco-crema p-4 shadow-sm transition-colors duration-500 ease-in-out dark:border-gris-ceniza/10 dark:bg-negro-azulada lg:hidden">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="text-principal transition-opacity hover:opacity-80 focus:outline-none dark:text-secundario"
                            aria-label="Abrir menú"
                        >
                            <LuMenu className="text-3xl" />
                        </button>
                    </div>
                    {/* Reutilizamos el logo para la cabecera en móvil, centrado */}
                    <div className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 transform items-center gap-2">
                        <img
                            className="h-8 w-auto object-contain transition-all duration-500 dark:brightness-0 dark:invert"
                            src="/logoBueno.svg"
                            alt="Logo"
                        />
                        <h2 className="m-0 h-fit p-0 text-lg font-bold leading-none text-principal transition-colors duration-500 dark:text-secundario">
                            Nómada
                        </h2>
                    </div>
                    <div>
                        <ThemeToggle />
                    </div>
                </header>

                <main className="w-full flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
