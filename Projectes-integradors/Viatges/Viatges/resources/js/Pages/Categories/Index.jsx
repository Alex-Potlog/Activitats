import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Footer from '@/Components/UI/Footer';
import { useState } from 'react';
import ThemeToggle from '@/Components/UI/ThemeToggle';

export default function CategoriesIndex({ categories, canManageCategories }) {
    const { flash } = usePage().props;
    const items = categories.data ?? [];

    const createCategoryForm = useForm({ nom: '', descripcio: '' });
    const updateCategoryForm = useForm({ nom: '', descripcio: '' });
    const deleteCategoryForm = useForm({});

    const [editingCategoryId, setEditingCategoryId] = useState(null);

    const createCategory = (event) => {
        event.preventDefault();

        createCategoryForm.post(route('admin.categories.store'), {
            preserveScroll: true,
            onSuccess: () => createCategoryForm.reset(),
        });
    };

    const startCategoryEdit = (category) => {
        setEditingCategoryId(category.id);
        updateCategoryForm.setData({
            nom: category.nom,
            descripcio: category.descripcio,
        });
        updateCategoryForm.clearErrors();
    };

    const cancelCategoryEdit = () => {
        setEditingCategoryId(null);
        updateCategoryForm.reset();
        updateCategoryForm.clearErrors();
    };

    const saveCategory = (event, categoryId) => {
        event.preventDefault();

        updateCategoryForm.patch(route('admin.categories.update', categoryId), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingCategoryId(null);
                updateCategoryForm.reset();
            },
        });
    };

    const deleteCategory = (category) => {
        if (
            !globalThis.confirm(
                `Segur que vols eliminar la categoria ${category.nom}?`,
            )
        ) {
            return;
        }

        deleteCategoryForm.delete(
            route('admin.categories.destroy', category.id),
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <Head title="Categories" />

            <div className="flex min-h-screen flex-col bg-blanco-crema dark:bg-gray-900">
                <div className="flex-1 py-10">
                    <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
                        {flash?.success && (
                            <div className="border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                {flash.success}
                            </div>
                        )}

                        {flash?.error && (
                            <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {flash.error}
                            </div>
                        )}
                        <div className="flex justify-end">
                            <ThemeToggle />
                        </div>

                        <section className="rounded-none border border-gris-arena bg-white p-6 shadow-sm dark:bg-gray-800">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h1 className="mt-2 text-2xl font-bold text-azul-medianoche dark:text-white">
                                        Categories
                                    </h1>
                                    <p className="mt-2 text-sm text-gris-ceniza">
                                        Consulta el llistat de categories
                                    </p>
                                </div>

                                <Link
                                    href={route('welcome')}
                                    className="border border-gris-arena px-4 py-2 text-sm font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-white dark:text-white dark:hover:bg-secundario"
                                >
                                    Tornar a inici
                                </Link>
                            </div>
                        </section>

                        {canManageCategories && (
                            <section className="rounded-none border border-gris-arena bg-white p-6 shadow-sm dark:bg-gray-800">
                                <h2 className="text-lg font-semibold text-azul-medianoche dark:text-white">
                                    Gestió de categories
                                </h2>

                                <form
                                    className="mt-4 grid gap-3"
                                    onSubmit={createCategory}
                                >
                                    <div>
                                        <label
                                            htmlFor="categoria_nom"
                                            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gris-ceniza"
                                        >
                                            Nom
                                        </label>
                                        <input
                                            id="categoria_nom"
                                            type="text"
                                            value={createCategoryForm.data.nom}
                                            onChange={(event) =>
                                                createCategoryForm.setData(
                                                    'nom',
                                                    event.target.value,
                                                )
                                            }
                                            className="w-full border border-gris-arena px-3 py-2 text-sm text-principal focus:border-secundario focus:outline-none"
                                        />
                                        {createCategoryForm.errors.nom && (
                                            <p className="mt-1 text-xs text-secundario">
                                                {createCategoryForm.errors.nom}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="categoria_descripcio"
                                            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gris-ceniza"
                                        >
                                            Descripció
                                        </label>
                                        <textarea
                                            id="categoria_descripcio"
                                            value={
                                                createCategoryForm.data
                                                    .descripcio
                                            }
                                            onChange={(event) =>
                                                createCategoryForm.setData(
                                                    'descripcio',
                                                    event.target.value,
                                                )
                                            }
                                            rows={3}
                                            className="w-full border border-gris-arena px-3 py-2 text-sm text-principal focus:border-secundario focus:outline-none"
                                        />
                                        {createCategoryForm.errors
                                            .descripcio && (
                                            <p className="mt-1 text-xs text-secundario">
                                                {
                                                    createCategoryForm.errors
                                                        .descripcio
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={
                                                createCategoryForm.processing
                                            }
                                            className="bg-secundario px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-oro-mostaza disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            Crear categoria
                                        </button>
                                    </div>
                                </form>
                            </section>
                        )}

                        <section className="rounded-none border border-gris-arena bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-azul-medianoche dark:text-white">
                                Categories disponibles
                            </h2>

                            {items.length > 0 ? (
                                <div className="mt-4 space-y-3">
                                    {items.map((category) => (
                                        <article
                                            key={category.id}
                                            className="border border-gris-arena p-4"
                                        >
                                            {canManageCategories &&
                                            editingCategoryId ===
                                                category.id ? (
                                                <form
                                                    onSubmit={(event) =>
                                                        saveCategory(
                                                            event,
                                                            category.id,
                                                        )
                                                    }
                                                    className="space-y-3"
                                                >
                                                    <div>
                                                        <label
                                                            htmlFor={`edit_nom_${category.id}`}
                                                            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gris-ceniza"
                                                        >
                                                            Nom
                                                        </label>
                                                        <input
                                                            id={`edit_nom_${category.id}`}
                                                            type="text"
                                                            value={
                                                                updateCategoryForm
                                                                    .data.nom
                                                            }
                                                            onChange={(event) =>
                                                                updateCategoryForm.setData(
                                                                    'nom',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full border border-gris-arena px-3 py-2 text-sm text-principal focus:border-secundario focus:outline-none"
                                                        />
                                                        {updateCategoryForm
                                                            .errors.nom && (
                                                            <p className="mt-1 text-xs text-secundario dark:text-red-500">
                                                                {
                                                                    updateCategoryForm
                                                                        .errors
                                                                        .nom
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor={`edit_desc_${category.id}`}
                                                            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gris-ceniza"
                                                        >
                                                            Descripció
                                                        </label>
                                                        <textarea
                                                            id={`edit_desc_${category.id}`}
                                                            value={
                                                                updateCategoryForm
                                                                    .data
                                                                    .descripcio
                                                            }
                                                            onChange={(event) =>
                                                                updateCategoryForm.setData(
                                                                    'descripcio',
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            rows={3}
                                                            className="w-full border border-gris-arena px-3 py-2 text-sm text-principal focus:border-secundario focus:outline-none"
                                                        />
                                                        {updateCategoryForm
                                                            .errors
                                                            .descripcio && (
                                                            <p className="mt-1 text-xs text-secundario dark:text-red-500">
                                                                {
                                                                    updateCategoryForm
                                                                        .errors
                                                                        .descripcio
                                                                }
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                cancelCategoryEdit
                                                            }
                                                            className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:text-white hover:dark:bg-red-800"
                                                        >
                                                            Cancel·lar
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                updateCategoryForm.processing
                                                            }
                                                            className="bg-secundario px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-oro-mostaza disabled:cursor-not-allowed disabled:opacity-60"
                                                        >
                                                            Desar canvis
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <p className="text-base font-semibold text-principal dark:text-white">
                                                            {category.nom}
                                                        </p>
                                                        <p className="text-xs uppercase tracking-wide text-gris-ceniza">
                                                            {
                                                                category.experiencies_count
                                                            }{' '}
                                                            experiències
                                                        </p>
                                                    </div>

                                                    <p className="text-sm text-gris-ceniza">
                                                        {category.descripcio}
                                                    </p>

                                                    {canManageCategories && (
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    startCategoryEdit(
                                                                        category,
                                                                    )
                                                                }
                                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:text-white dark:hover:bg-secundario"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteCategory(
                                                                        category,
                                                                    )
                                                                }
                                                                disabled={
                                                                    deleteCategoryForm.processing
                                                                }
                                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema disabled:cursor-not-allowed disabled:opacity-60 dark:text-white dark:hover:bg-secundario"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </article>
                                    ))}

                                    <div className="flex items-center justify-end gap-2">
                                        {categories.prev_page_url ? (
                                            <Link
                                                href={categories.prev_page_url}
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

                                        {categories.next_page_url ? (
                                            <Link
                                                href={categories.next_page_url}
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
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-gris-ceniza">
                                    Encara no hi ha categories creades.
                                </p>
                            )}
                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
