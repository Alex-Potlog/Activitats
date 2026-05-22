import { useEffect, useState } from "react";

export default function SearchBar({ onSearch, initialValue = "" }) {
    const normalizedInitialValue = initialValue ?? "";
    const [query, setQuery] = useState(normalizedInitialValue);

    useEffect(() => {
        setQuery(normalizedInitialValue);
    }, [normalizedInitialValue]);

    const handleSearch = () => {
        onSearch?.(query.trim());
    };

    return (
        <form className="max-w-xxl mx-auto bg-inherit" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only">
                Buscar
            </label>
            <div className="relative">
                <input
                    type="search"
                    id="search"
                    value={query ?? ""}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body bg-inherit rounded-3xl"
                    placeholder="Buscar"
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className="absolute end-1.5 bottom-1.5 text-black dark:text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
                >
                    <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
            </div>
        </form>
    );
}