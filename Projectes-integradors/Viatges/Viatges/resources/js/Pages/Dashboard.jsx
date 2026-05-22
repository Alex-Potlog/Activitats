import Experiencia from '@/Components/Cards/Experiencia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Components/UI/Footer';
import { Head, Link } from '@inertiajs/react';

const numberFormatter = new Intl.NumberFormat('ca-ES');

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

function getOwnExperienceStatus(experiencia) {
    if (experiencia.estat === 'rebutjat') {
        return {
            label: 'Rebutjada',
            className:
                'border border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300',
        };
    }

    if (experiencia.estat === 'esborrany') {
        return {
            label: 'Esborrany',
            className:
                'border border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300',
        };
    }

    return {
        label: 'Publicada',
        className:
            'border border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300',
    };
}

export default function Dashboard({
    stats,
    ownExperiencies,
    recentExperiencies,
    topExperiencia,
    topCategories,
}) {
    const statCards = [
        {
            title: 'Experiències publicades',
            value: stats.totalExperiencies,
            helper: `${stats.currentMonthExperiencies} aquest mes`,
        },
        {
            title: 'Likes rebuts',
            value: stats.totalLikes,
            helper: 'Només likes positius',
        },
        {
            title: 'Comentaris rebuts',
            value: stats.totalComentaris,
            helper: 'Interacció a les teves publicacions',
        },
        {
            title: 'Evolució mensual',
            value: `${stats.monthlyGrowth > 0 ? '+' : ''}${stats.monthlyGrowth}%`,
            helper: 'Comparat amb el mes anterior',
        },
    ];

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Dashboard" />

                <div className="bg-blanco-crema py-10 transition-colors duration-500 dark:bg-negro-azulada">
                    <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
                        <section className="space-y-6 lg:col-span-2">
                            <div className="rounded-none border border-gris-ceniza/20 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gris-ceniza dark:text-gris-plata">
                                    Panell personal
                                </p>
                                <h1 className="mt-2 text-2xl font-bold text-azul-medianoche dark:text-blanco-crema">
                                    Rendiment de les teves experiències
                                </h1>
                                <p className="mt-2 text-sm text-gris-ceniza dark:text-gris-plata">
                                    Consulta com evoluciona la teva activitat i
                                    accedeix directament a les accions
                                    principals.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {statCards.map((card) => (
                                    <article
                                        key={card.title}
                                        className="rounded-none border border-gris-ceniza/20 bg-white p-5 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]"
                                    >
                                        <p className="text-sm font-medium text-gris-ceniza dark:text-gris-plata">
                                            {card.title}
                                        </p>
                                        <p className="mt-2 text-3xl font-black text-principal dark:text-secundario">
                                            {typeof card.value === 'number'
                                                ? numberFormatter.format(
                                                      card.value,
                                                  )
                                                : card.value}
                                        </p>
                                        <p className="mt-1 text-xs uppercase tracking-wide text-gris-ceniza dark:text-gris-plata">
                                            {card.helper}
                                        </p>
                                    </article>
                                ))}
                            </div>

                            <div className="rounded-none border border-gris-ceniza/20 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-azul-medianoche dark:text-blanco-crema">
                                        Activitat recent
                                    </h2>
                                    <Link
                                        href={route('experiencies.index')}
                                        className="text-sm font-semibold text-secundario transition-colors hover:text-oro-mostaza dark:hover:text-blanco-crema"
                                    >
                                        Veure-ho tot
                                    </Link>
                                </div>

                                {recentExperiencies.length > 0 ? (
                                    <div className="mt-4 space-y-3">
                                        {recentExperiencies.map(
                                            (experiencia) => (
                                                <article
                                                    key={experiencia.id}
                                                    className="flex flex-col gap-2 border border-gris-ceniza/20 p-4 dark:border-gris-ceniza/10 sm:flex-row sm:items-center sm:justify-between"
                                                >
                                                    <div className="min-w-0">
                                                        <p className="whitespace-normal break-words font-semibold text-azul-medianoche dark:text-blanco-crema">
                                                            {experiencia.titol}
                                                        </p>
                                                        <p className="whitespace-normal break-words text-sm text-gris-ceniza dark:text-gris-plata">
                                                            {experiencia.ubicacio_nom ||
                                                                'Ubicació no especificada'}
                                                        </p>
                                                        <p className="whitespace-normal break-words text-xs uppercase tracking-wide text-gris-ceniza dark:text-gris-plata">
                                                            {experiencia
                                                                .categories
                                                                ?.length
                                                                ? experiencia.categories
                                                                      .map(
                                                                          (
                                                                              categoria,
                                                                          ) =>
                                                                              categoria.nom,
                                                                      )
                                                                      .join(
                                                                          ', ',
                                                                      )
                                                                : 'Sense categoria'}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-sm font-medium text-principal dark:text-secundario">
                                                        <span>
                                                            {
                                                                experiencia.likes_positius_count
                                                            }{' '}
                                                            likes
                                                        </span>
                                                        <span>
                                                            {
                                                                experiencia.comentaris_count
                                                            }{' '}
                                                            comentaris
                                                        </span>
                                                        <span className="text-gris-ceniza dark:text-gris-plata">
                                                            {formatDate(
                                                                experiencia.data_publicacio ||
                                                                    experiencia.created_at,
                                                            )}
                                                        </span>
                                                    </div>
                                                </article>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <div className="mt-4 border border-dashed border-gris-ceniza/20 p-6 text-center dark:border-gris-ceniza/10">
                                        <p className="text-sm text-gris-ceniza dark:text-gris-plata">
                                            Encara no tens experiències
                                            publicades.
                                        </p>
                                        <Link
                                            href={route('experiencies.create')}
                                            className="mt-3 inline-flex bg-principal px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blanco-crema transition-colors hover:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:hover:bg-oro-mostaza"
                                        >
                                            Publica la primera
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </section>

                        <aside className="space-y-6">
                            <div className="rounded-none border border-gris-ceniza/20 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                                <h2 className="text-lg font-semibold text-azul-medianoche dark:text-blanco-crema">
                                    Accions ràpides
                                </h2>
                                <div className="mt-4 grid gap-3">
                                    <Link
                                        href={route('experiencies.create')}
                                        className="bg-principal px-4 py-2 text-center text-sm font-semibold uppercase tracking-wide text-blanco-crema transition-colors hover:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:hover:bg-oro-mostaza"
                                    >
                                        Crear experiència
                                    </Link>
                                    <Link
                                        href={route('experiencies.index')}
                                        className="border border-gris-ceniza/20 px-4 py-2 text-center text-sm font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:border-gris-ceniza/10 dark:text-secundario dark:hover:bg-azul-medianoche/30"
                                    >
                                        Veure feed complet
                                    </Link>
                                    <Link
                                        href={route('profile.edit')}
                                        className="border border-gris-ceniza/20 px-4 py-2 text-center text-sm font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:border-gris-ceniza/10 dark:text-secundario dark:hover:bg-azul-medianoche/30"
                                    >
                                        Editar perfil
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-none border border-gris-ceniza/20 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                                <h2 className="text-lg font-semibold text-azul-medianoche dark:text-blanco-crema">
                                    Millor experiència
                                </h2>

                                {topExperiencia ? (
                                    <div className="mt-4 space-y-2">
                                        <Link
                                            href={route(
                                                'experiencies.show',
                                                topExperiencia.id,
                                            )}
                                            className="block h-full w-full"
                                        >
                                            <p className="text-base font-semibold text-principal hover:underline dark:text-secundario">
                                                {topExperiencia.titol}
                                            </p>
                                        </Link>

                                        <p className="text-sm text-gris-ceniza dark:text-gris-plata">
                                            {topExperiencia.ubicacio_nom ||
                                                'Ubicació no especificada'}
                                        </p>
                                        <p className="text-xs uppercase tracking-wide text-gris-ceniza dark:text-gris-plata">
                                            Publicada el{' '}
                                            {formatDate(
                                                topExperiencia.data_publicacio,
                                            )}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mt-4 text-sm text-gris-ceniza dark:text-gris-plata">
                                        Quan publiquis experiències, aquí veuràs
                                        la que millor rendiment tingui.
                                    </p>
                                )}
                            </div>

                            <div className="rounded-none border border-gris-ceniza/20 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                                <h2 className="text-lg font-semibold text-azul-medianoche dark:text-blanco-crema">
                                    Categories destacades
                                </h2>

                                {topCategories.length > 0 ? (
                                    <ul className="mt-4 space-y-2">
                                        {topCategories.map((category) => (
                                            <li
                                                key={category.id}
                                                className="flex items-center justify-between border border-gris-ceniza/20 px-3 py-2 dark:border-gris-ceniza/10"
                                            >
                                                <span className="text-sm font-medium text-principal dark:text-secundario">
                                                    {category.nom}
                                                </span>
                                                <span className="text-xs uppercase tracking-wide text-gris-ceniza dark:text-gris-plata">
                                                    {
                                                        category.total_experiencies
                                                    }
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-4 text-sm text-gris-ceniza dark:text-gris-plata">
                                        Encara no hi ha prou dades per destacar
                                        categories.
                                    </p>
                                )}
                            </div>
                        </aside>
                    </div>

                    <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="rounded-none border border-gris-ceniza/20 bg-white p-6 shadow-sm transition-colors duration-500 dark:border-gris-ceniza/10 dark:bg-[#06001a]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-azul-medianoche dark:text-blanco-crema">
                                    Les meves experiències
                                </h2>
                                <Link
                                    href={route('experiencies.index')}
                                    className="text-sm font-semibold text-secundario transition-colors hover:text-oro-mostaza dark:hover:text-blanco-crema"
                                >
                                    Veure feed
                                </Link>
                            </div>

                            {ownExperiencies.length > 0 ? (
                                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {ownExperiencies.map((experiencia) => {
                                        const status =
                                            getOwnExperienceStatus(experiencia);
                                        const canEditDraft =
                                            experiencia.estat === 'esborrany';

                                        return (
                                            <div key={experiencia.id}>
                                                <div className="mb-2 flex items-center justify-between gap-2">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${status.className}`}
                                                    >
                                                        {status.label}
                                                    </span>
                                                    {canEditDraft && (
                                                        <Link
                                                            href={route(
                                                                'experiencies.edit',
                                                                experiencia.id,
                                                            )}
                                                            className="inline-flex items-center rounded border border-gris-arena/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-principal transition-colors hover:bg-blanco-crema dark:border-gris-ceniza/20 dark:text-secundario dark:hover:bg-azul-medianoche/30"
                                                        >
                                                            Editar
                                                        </Link>
                                                    )}
                                                </div>
                                                <Experiencia
                                                    experiencia={experiencia}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="mt-4 border border-dashed border-gris-ceniza/20 p-6 text-center dark:border-gris-ceniza/10">
                                    <p className="text-sm text-gris-ceniza dark:text-gris-plata">
                                        Encara no has publicat cap experiència
                                        pròpia.
                                    </p>
                                    <Link
                                        href={route('experiencies.create')}
                                        className="mt-3 inline-flex bg-principal px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blanco-crema transition-colors hover:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:hover:bg-oro-mostaza"
                                    >
                                        Crea una experiència
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <Footer></Footer>
        </>
    );
}
