import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Footer from '@/Components/UI/Footer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const dateFormatter = new Intl.DateTimeFormat('ca-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

function formatDate(dateValue) {
    if (!dateValue) {
        return '-';
    }

    return dateFormatter.format(new Date(dateValue));
}

export default function AdminIndex({ reportedExperiencies, users }) {
    const keepForm = useForm({});
    const rejectForm = useForm({});
    const deleteUserForm = useForm({});
    const { flash } = usePage().props;
    const reportedItems = reportedExperiencies.data ?? [];
    const userItems = users.data ?? [];

    const rejectReportedExperiencia = (experienciaId) => {
        rejectForm.patch(route('admin.experiencies.reject', experienciaId), {
            preserveScroll: true,
        });
    };

    const keepReportedExperiencia = (experienciaId) => {
        keepForm.patch(route('admin.experiencies.keep', experienciaId), {
            preserveScroll: true,
        });
    };

    const deleteUser = (user) => {
        if (
            !globalThis.confirm(
                `Segur que vols donar de baixa l'usuari ${user.name}?`,
            )
        ) {
            return;
        }

        deleteUserForm.delete(route('admin.users.destroy', user.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Administració" />

            <div className="flex min-h-screen flex-col bg-blanco-crema transition-colors duration-500 dark:bg-negro-azulada">
                <div className="flex-1 py-10">
                    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
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

                        <section className="rounded-none border border-gris-ceniza/20 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                        Secció d'administració
                                    </p>
                                    <h1 className="mt-2 text-2xl font-bold text-azul-medianoche transition-colors duration-500 dark:text-blanco-crema">
                                        Gestió interna de la plataforma
                                    </h1>
                                    <p className="mt-2 text-sm text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                        Aquí pots revisar reports, donar de
                                        baixa usuaris i accedir a la gestió de
                                        categories.
                                    </p>
                                </div>
                                <Link
                                    href={route('categorias.list')}
                                    className="bg-principal px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blanco-crema transition-colors hover:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:hover:bg-oro-mostaza"
                                >
                                    Gestió de Categories
                                </Link>
                            </div>
                        </section>

                        <section className="rounded-none border border-gris-ceniza/20 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                            <h2 className="text-lg font-semibold text-azul-medianoche transition-colors duration-500 dark:text-blanco-crema">
                                Experiències reportades
                            </h2>

                            {reportedItems.length > 0 ? (
                                <div className="mt-4 space-y-4">
                                    {reportedItems.map((experiencia) => (
                                        <article
                                            key={experiencia.id}
                                            className="border border-gris-ceniza/20 p-4 dark:border-gris-ceniza/10"
                                        >
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="whitespace-normal break-words text-base font-semibold text-principal transition-colors duration-500 dark:text-secundario">
                                                        {experiencia.titol}
                                                    </p>
                                                    <p className="whitespace-normal break-words text-sm text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                                        {experiencia.ubicacio_nom ||
                                                            'Ubicació no especificada'}
                                                    </p>
                                                    <p className="text-xs uppercase tracking-wide text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                                        {
                                                            experiencia.reports_count
                                                        }{' '}
                                                        reports · publicat el{' '}
                                                        {formatDate(
                                                            experiencia.data_publicacio ||
                                                                experiencia.created_at,
                                                        )}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            keepReportedExperiencia(
                                                                experiencia.id,
                                                            )
                                                        }
                                                        disabled={
                                                            keepForm.processing ||
                                                            rejectForm.processing
                                                        }
                                                        className="border border-gris-ceniza/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-principal/5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gris-ceniza/10 dark:text-secundario dark:hover:bg-secundario/10"
                                                    >
                                                        Mantenir experiència
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            rejectReportedExperiencia(
                                                                experiencia.id,
                                                            )
                                                        }
                                                        disabled={
                                                            rejectForm.processing ||
                                                            keepForm.processing
                                                        }
                                                        className="bg-principal px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blanco-crema transition-colors hover:bg-azul-medianoche disabled:cursor-not-allowed disabled:opacity-60 dark:bg-secundario dark:text-negro-azulada dark:hover:bg-oro-mostaza"
                                                    >
                                                        Rebutjar experiència
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                                {experiencia.reports.map(
                                                    (report) => (
                                                        <div
                                                            key={report.id}
                                                            className="border border-gris-ceniza/20 bg-principal/5 px-3 py-2 text-sm dark:border-gris-ceniza/10 dark:bg-secundario/10"
                                                        >
                                                            <p className="font-semibold text-principal transition-colors duration-500 dark:text-secundario">
                                                                Reportat per:{' '}
                                                                {report.usuari
                                                                    ?.name ||
                                                                    'Usuari eliminat'}
                                                            </p>
                                                            <p className="text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                                                {report.usuari
                                                                    ?.email ||
                                                                    '-'}
                                                            </p>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </article>
                                    ))}

                                    <div className="flex items-center justify-end gap-2">
                                        {reportedExperiencies.prev_page_url ? (
                                            <Link
                                                href={
                                                    reportedExperiencies.prev_page_url
                                                }
                                                preserveScroll
                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:border-oro-mostaza/50 dark:text-oro-mostaza dark:hover:bg-oro-mostaza/15"
                                            >
                                                Anterior
                                            </Link>
                                        ) : (
                                            <button
                                                type="button"
                                                disabled
                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal disabled:cursor-not-allowed disabled:opacity-50 dark:border-oro-mostaza/50 dark:text-oro-mostaza"
                                            >
                                                Anterior
                                            </button>
                                        )}

                                        {reportedExperiencies.next_page_url ? (
                                            <Link
                                                href={
                                                    reportedExperiencies.next_page_url
                                                }
                                                preserveScroll
                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:border-oro-mostaza/50 dark:text-oro-mostaza dark:hover:bg-oro-mostaza/15"
                                            >
                                                Següent
                                            </Link>
                                        ) : (
                                            <button
                                                type="button"
                                                disabled
                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal disabled:cursor-not-allowed disabled:opacity-50 dark:border-oro-mostaza/50 dark:text-oro-mostaza"
                                            >
                                                Següent
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                    No hi ha experiències reportades pendents de
                                    revisió.
                                </p>
                            )}
                        </section>

                        <section className="rounded-none border border-gris-ceniza/20 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                            <h2 className="text-lg font-semibold text-azul-medianoche transition-colors duration-500 dark:text-blanco-crema">
                                Baixa d'usuaris
                            </h2>

                            {userItems.length > 0 ? (
                                <div className="mt-4 overflow-x-auto">
                                    <table className="min-w-full border border-gris-ceniza/20 text-left text-sm dark:border-gris-ceniza/10">
                                        <thead className="bg-blanco-crema text-xs uppercase tracking-wide text-gris-ceniza transition-colors duration-500 dark:bg-[#06001a] dark:text-gris-plata">
                                            <tr>
                                                <th className="px-3 py-2">
                                                    Nom
                                                </th>
                                                <th className="px-3 py-2">
                                                    Email
                                                </th>
                                                <th className="px-3 py-2">
                                                    Rol
                                                </th>
                                                <th className="px-3 py-2">
                                                    Alta
                                                </th>
                                                <th className="px-3 py-2 text-right">
                                                    Accions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userItems.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="border-t border-gris-ceniza/20 dark:border-gris-ceniza/10"
                                                >
                                                    <td className="px-3 py-2 font-medium text-principal transition-colors duration-500 dark:text-secundario">
                                                        {user.name}
                                                    </td>
                                                    <td className="px-3 py-2 text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-3 py-2 text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                                        {user.is_admin
                                                            ? 'Administrador'
                                                            : 'Usuari'}
                                                    </td>
                                                    <td className="px-3 py-2 text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                                        {formatDate(
                                                            user.created_at,
                                                        )}
                                                    </td>
                                                    <td className="px-3 py-2 text-right">
                                                        {user.is_admin ? (
                                                            <span className="text-xs uppercase tracking-wide text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                                                Protegit
                                                            </span>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteUser(
                                                                        user,
                                                                    )
                                                                }
                                                                disabled={
                                                                    deleteUserForm.processing
                                                                }
                                                                className="border border-gris-ceniza/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors duration-500 hover:bg-principal/5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gris-ceniza/10 dark:text-secundario dark:hover:bg-secundario/10"
                                                            >
                                                                Donar de baixa
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="mt-3 flex items-center justify-end gap-2">
                                        {users.prev_page_url ? (
                                            <Link
                                                href={users.prev_page_url}
                                                preserveScroll
                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:border-oro-mostaza/50 dark:text-oro-mostaza dark:hover:bg-oro-mostaza/15"
                                            >
                                                Anterior
                                            </Link>
                                        ) : (
                                            <button
                                                type="button"
                                                disabled
                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal disabled:cursor-not-allowed disabled:opacity-50 dark:border-oro-mostaza/50 dark:text-oro-mostaza"
                                            >
                                                Anterior
                                            </button>
                                        )}

                                        {users.next_page_url ? (
                                            <Link
                                                href={users.next_page_url}
                                                preserveScroll
                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:border-oro-mostaza/50 dark:text-oro-mostaza dark:hover:bg-oro-mostaza/15"
                                            >
                                                Següent
                                            </Link>
                                        ) : (
                                            <button
                                                type="button"
                                                disabled
                                                className="border border-gris-arena px-3 py-1 text-xs font-semibold uppercase tracking-wide text-principal disabled:cursor-not-allowed disabled:opacity-50 dark:border-oro-mostaza/50 dark:text-oro-mostaza"
                                            >
                                                Següent
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-gris-ceniza transition-colors duration-500 dark:text-gris-plata">
                                    No hi ha usuaris per gestionar.
                                </p>
                            )}
                        </section>
                    </div>
                </div>

                <Footer />
            </div>
        </AuthenticatedLayout>
    );
}
