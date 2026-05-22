import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import Footer from '@/Components/UI/Footer';
import LikeDislikeButton from '@/Components/Cards/CardActions/LikeDislikeButton';
import { BiCommentDetail } from 'react-icons/bi';
import Map from '../../Components/Cards/Map';
import RichTextContent from '@/Components/UI/RichTextContent';

function formatDate(value) {
    if (!value) {
        return 'Data no disponible';
    }

    return new Intl.DateTimeFormat('ca-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
}

function cloudinaryTransform(url, transformations) {
    if (!url) return url;

    return url.replace('/upload/', `/upload/${transformations}/`);
}

function getOwnerExperienceStatus(experiencia) {
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

export default function Show({ experiencia }) {
    const { auth } = usePage().props;
    const isOwner = auth?.user?.id === experiencia.id_usuari_creador;
    const ownerStatus = isOwner ? getOwnerExperienceStatus(experiencia) : null;
    const statusForm = useForm({});
    const deleteForm = useForm({});
    const commentForm = useForm({ contingut: '' });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        commentForm.post(route('comentaris.store', experiencia.id), {
            preserveScroll: true,
            onSuccess: () => commentForm.reset('contingut'),
        });
    };

    const handleDelete = () => {
        if (
            !globalThis.confirm(
                'Segur que vols eliminar aquesta experiència? Aquesta acció no es pot desfer.',
            )
        ) {
            return;
        }
        deleteForm.delete(route('experiencies.destroy', experiencia.id));
    };

    const handleToggleStatus = () => {
        statusForm.patch(route('experiencies.estat.update', experiencia.id), {
            preserveScroll: true,
        });
    };

    const handleDeleteComment = (comentariId) => {
        if (
            !globalThis.confirm(
                'Segur que vols eliminar aquest comentari? Aquesta acció no es pot desfer.',
            )
        ) {
            return;
        }

        router.delete(route('comentaris.destroy', comentariId), {
            preserveScroll: true,
        });
    };

    const canToggleStatus = isOwner && experiencia.estat !== 'rebutjat';
    const canEditDraft = isOwner && experiencia.estat === 'esborrany';
    const toggleButtonLabel =
        experiencia.estat === 'esborrany'
            ? 'Publicar experiència'
            : 'Desar com a esborrany';

    const categoriesText =
        experiencia.categories?.length > 0
            ? experiencia.categories
                  .map((categoria) => categoria.nom)
                  .join(', ')
            : 'Sense categoria';

    return (
        <>
            <Head title={experiencia?.titol ?? "Detall d'experiència"} />

            <PanelLayout>
                <div className="flex min-h-screen flex-col bg-white px-6 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
                    <main className="mx-auto mt-8 w-full max-w-5xl pb-10">
                        <div className="flex items-center justify-between">
                            <Link
                                href={route('welcome')}
                                className="inline-flex items-center rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                                Tornar a l'inici
                            </Link>

                            {isOwner && (
                                <div className="flex flex-wrap items-center gap-2">
                                    {canEditDraft && (
                                        <Link
                                            href={route(
                                                'experiencies.edit',
                                                experiencia.id,
                                            )}
                                            className="inline-flex items-center rounded border border-gris-arena/50 px-4 py-2 text-sm font-semibold text-principal transition-colors hover:bg-blanco-crema dark:border-gris-ceniza/20 dark:text-secundario dark:hover:bg-azul-medianoche/30"
                                        >
                                            Editar esborrany
                                        </Link>
                                    )}
                                    {canToggleStatus && (
                                        <button
                                            type="button"
                                            onClick={handleToggleStatus}
                                            disabled={statusForm.processing}
                                            className="inline-flex items-center rounded border border-principal px-4 py-2 text-sm font-semibold text-principal transition-colors hover:bg-principal hover:text-blanco-crema disabled:opacity-50 dark:border-secundario dark:text-secundario dark:hover:bg-secundario dark:hover:text-negro-azulada"
                                        >
                                            {statusForm.processing
                                                ? 'Guardant...'
                                                : toggleButtonLabel}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        disabled={deleteForm.processing}
                                        className="inline-flex items-center rounded border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:border-red-700 hover:bg-red-700 hover:text-white disabled:opacity-50 dark:border-red-700 dark:text-red-400 dark:hover:border-red-800 dark:hover:bg-red-800 dark:hover:text-white"
                                    >
                                        Eliminar experiència
                                    </button>
                                </div>
                            )}
                        </div>

                        <article className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <picture className="h-full w-full">
                                <source
                                    srcSet={cloudinaryTransform(
                                        experiencia.imatge,
                                        'f_avif,q_auto',
                                    )}
                                    type="image/avif"
                                />
                                <source
                                    srcSet={cloudinaryTransform(
                                        experiencia.imatge,
                                        'f_webp,q_auto',
                                    )}
                                    type="image/webp"
                                />
                                <img
                                    src={cloudinaryTransform(
                                        experiencia.imatge,
                                        'f_auto,q_auto',
                                    )}
                                    alt={experiencia.titol}
                                    loading="lazy"
                                    className="h-64 w-full object-cover sm:h-80"
                                />
                            </picture>

                            <div className="space-y-6 p-6 sm:p-8">
                                <header className="space-y-3">
                                    <h1 className="whitespace-normal break-words text-3xl font-black tracking-tight text-principal sm:text-4xl">
                                        {experiencia.titol}
                                    </h1>
                                    {ownerStatus && (
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${ownerStatus.className}`}
                                        >
                                            {ownerStatus.label}
                                        </span>
                                    )}
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span>
                                            per{' '}
                                            {experiencia.usuari?.name ??
                                                'Usuari anònim'}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {formatDate(
                                                experiencia.data_publicacio,
                                            )}
                                        </span>
                                        <span>•</span>
                                        <span className="whitespace-normal break-words">
                                            {categoriesText}
                                        </span>
                                        <span>•</span>
                                        <span className="whitespace-normal break-words">
                                            {experiencia.ubicacio_nom ??
                                                'Ubicació no indicada'}
                                        </span>
                                    </div>
                                </header>

                                <div className="flex items-center gap-4">
                                    <LikeDislikeButton
                                        experienciaId={experiencia.id}
                                        userReaction={
                                            experiencia.user_reaction ?? 0
                                        }
                                        likesCount={
                                            experiencia.likes_count ?? 0
                                        }
                                        iconClassName="text-negro-azulada dark:text-gris-plata"
                                        withBackground={true}
                                    />
                                    <div className="flex items-center gap-1.5">
                                        <BiCommentDetail className="h-6 w-6 text-negro-azulada dark:text-gris-plata" />
                                        <span className="font-secundaria text-xs font-semibold tabular-nums text-negro-azulada dark:text-gris-plata">
                                            {experiencia.comentaris_count ?? 0}
                                        </span>
                                    </div>
                                </div>

                                <section>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        Història
                                    </h2>
                                    <div className="mt-3 text-gray-700 dark:text-gray-300">
                                        <RichTextContent
                                            content={
                                                experiencia.contingut ?? ''
                                            }
                                        />
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                        Comentaris
                                    </h2>

                                    {auth?.user && (
                                        <form
                                            onSubmit={handleCommentSubmit}
                                            className="mt-3"
                                        >
                                            <textarea
                                                value={
                                                    commentForm.data.contingut
                                                }
                                                onChange={(e) =>
                                                    commentForm.setData(
                                                        'contingut',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Escriu un comentari..."
                                                rows={3}
                                                maxLength={1000}
                                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-700 placeholder-gray-400 focus:border-principal focus:outline-none focus:ring-1 focus:ring-principal dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-principal dark:focus:ring-principal"
                                            />
                                            {commentForm.errors.contingut && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {
                                                        commentForm.errors
                                                            .contingut
                                                    }
                                                </p>
                                            )}
                                            <div className="mt-2 flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        commentForm.processing ||
                                                        !commentForm.data.contingut.trim()
                                                    }
                                                    className="inline-flex items-center rounded-lg bg-principal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-principal/90 disabled:opacity-50"
                                                >
                                                    Comentar
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {experiencia.comentaris?.length > 0 ? (
                                        <div className="mt-3 space-y-3">
                                            {experiencia.comentaris.map(
                                                (comentari) => (
                                                    <article
                                                        key={comentari.id}
                                                        className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                                                {comentari
                                                                    .usuari
                                                                    ?.name ??
                                                                    'Usuari'}
                                                            </p>

                                                            {auth?.user?.id ===
                                                                comentari.id_usuari && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDeleteComment(
                                                                            comentari.id,
                                                                        )
                                                                    }
                                                                    className="text-xs font-semibold uppercase tracking-wide text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                                >
                                                                    Eliminar
                                                                </button>
                                                            )}
                                                        </div>
                                                        <p className="mt-1 break-words text-sm leading-6 text-gray-600 dark:text-gray-300">
                                                            {
                                                                comentari.contingut
                                                            }
                                                        </p>
                                                    </article>
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                            Encara no hi ha comentaris en
                                            aquesta experiència.
                                        </p>
                                    )}
                                </section>
                                <section className="mt-6 h-64 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800 sm:h-96">
                                    {experiencia.latitud &&
                                    experiencia.longitud ? (
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${Number.parseFloat(experiencia.latitud)},${Number.parseFloat(experiencia.longitud)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative block h-full w-full"
                                            aria-label="Obrir ubicació a Google Maps"
                                        >
                                            <div className="absolute inset-0 z-10 block bg-transparent transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5" />
                                            <Map
                                                lat={Number.parseFloat(
                                                    experiencia.latitud,
                                                )}
                                                lng={Number.parseFloat(
                                                    experiencia.longitud,
                                                )}
                                            />
                                        </a>
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-50 text-sm font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                            Mapa no disponible
                                        </div>
                                    )}
                                </section>
                            </div>
                        </article>
                    </main>

                    <Footer />
                </div>
            </PanelLayout>
        </>
    );
}
