import { Head, Link, router } from '@inertiajs/react';
import { FaArrowDownWideShort, FaArrowUpWideShort } from 'react-icons/fa6';
import PanelLayout from '../Layouts/PanelLayout';
import Footer from '@/Components/UI/Footer';
import Experiencia from '@/Components/Cards/Experiencia';
import CardLayout from '@/Components/Cards/CardLayout';
import SearchBar from '@/Components/UI/SearchBar';

const SORT_OPTIONS = [
    { value: '', label: 'Per defecte' },
    { value: 'titol', label: 'Títol' },
    { value: 'data_publicacio', label: 'Data de publicació' },
    { value: 'likes', label: 'Likes' },
];

function navigateToWelcome({ newSort, newDirection, newSearch, categories }) {
    router.get(
        route('welcome'),
        {
            sort: newSort || undefined,
            direction: newSort ? newDirection : undefined,
            categories: categories || undefined,
            search: newSearch || undefined,
        },
        {
            preserveState: true,
            preserveScroll: true,
        },
    );
}

export default function Welcome({
    experiencies = {},
    sort = '',
    direction = 'asc',
    search = '',
}) {
    const items = experiencies.data ?? [];
    const { categories } = route().params;

    function navigate(newSort, newDirection, newSearch) {
        navigateToWelcome({
            newSort,
            newDirection,
            newSearch,
            categories,
        });
    }

    function handleSearch(query) {
        navigate(sort, direction, query);
    }

    function handleSortChange(e) {
        navigate(e.target.value, 'asc', search);
    }

    function handleDirectionToggle() {
        navigate(sort, direction === 'asc' ? 'desc' : 'asc', search);
    }

    return (
        <>
            <Head title="Nómada" />
            <PanelLayout>
                <div className="flex min-h-screen flex-col bg-white px-6 text-black/50 dark:bg-gray-900 dark:text-white/50">
                    <main className="mt-6">
                        <div className="mb-6 flex flex-col gap-4 md:grid md:grid-cols-3 md:items-center md:gap-2">
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="sort"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Ordenar per:
                                </label>
                                <select
                                    id="sort"
                                    value={sort ?? ''}
                                    onChange={handleSortChange}
                                    className="rounded border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {sort && (
                                    <button
                                        onClick={handleDirectionToggle}
                                        title={
                                            direction === 'asc'
                                                ? 'Ascendent'
                                                : 'Descendent'
                                        }
                                        className="rounded border border-gray-300 px-2 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        {direction === 'asc' ? (
                                            <FaArrowDownWideShort />
                                        ) : (
                                            <FaArrowUpWideShort />
                                        )}
                                    </button>
                                )}
                            </div>
                            <div className="w-full">
                                <SearchBar
                                    onSearch={handleSearch}
                                    initialValue={search}
                                />
                            </div>
                            <div className="hidden md:block" />
                        </div>
                        <CardLayout>
                            {items.map((experiencia) => (
                                <Experiencia
                                    key={experiencia.id}
                                    experiencia={experiencia}
                                />
                            ))}
                        </CardLayout>
                        <div className="mb-12 mt-6 flex items-center justify-end gap-2">
                            {experiencies.prev_page_url ? (
                                <Link
                                    href={experiencies.prev_page_url}
                                    preserveScroll
                                    className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:text-white dark:hover:bg-secundario"
                                >
                                    Anterior
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                                >
                                    Anterior
                                </button>
                            )}

                            {experiencies.links
                                .filter((link) => Number.isInteger(Number(link.label)))
                                .map((link) => (
                                    link.url ? (
                                        <Link
                                            key={link.label}
                                            href={link.url}
                                            preserveScroll
                                            className={`border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                                                link.active
                                                    ? "border-principal bg-principal text-white dark:border-white dark:bg-white dark:text-principal"
                                                    : "border-gris-arena text-principal hover:bg-blanco-crema dark:text-white dark:hover:bg-secundario"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <span
                                            key={link.label}
                                            className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal dark:text-white"
                                        >
                                            {link.label}
                                        </span>
                                    )
                                ))}

                            {experiencies.next_page_url ? (
                                <Link
                                    href={experiencies.next_page_url}
                                    preserveScroll
                                    className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:text-white dark:hover:bg-secundario"
                                >
                                    Següent
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                                >
                                    Següent
                                </button>
                            )}
                        </div>
                    </main>
                    <Footer></Footer>
                </div>
            </PanelLayout>
        </>
    );
}
