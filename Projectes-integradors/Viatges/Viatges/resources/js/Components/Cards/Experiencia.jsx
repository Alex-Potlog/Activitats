import { Link } from '@inertiajs/react';
import LikeButton from './CardActions/LikeDislikeButton';
import CommentButton from './CardActions/CommentButton';
import ReportButton from './CardActions/ReportButton';
import Map from './Map';

function cloudinaryTransform(url, transformations) {
    if (!url) return url;

    return url.replace('/upload/', `/upload/${transformations}/`);
}

export default function Experiencia({ experiencia }) {
    const detailUrl = route('experiencies.show', experiencia.id);

    return (
        <div className="flex h-auto w-full max-w-[350px] flex-col overflow-hidden rounded-lg border border-transparent bg-white shadow-lg shadow-gris-arena/40 transition-all duration-300 hover:shadow-xl hover:shadow-gris-arena/60 dark:border-gris-ceniza/10 dark:bg-[#06001a] dark:shadow-none dark:hover:shadow-none sm:h-[300px] sm:w-[320px] sm:min-w-[320px] sm:shrink-0 lg:w-[350px] lg:min-w-[350px]">
            <div
                id="cardHeader"
                className="h-40 w-full shrink-0 overflow-hidden sm:h-[40%]"
            >
                {/* Imatge principal del viatge */}
                <Link href={detailUrl} className="block h-full w-full">
                    <picture className="h-full w-full">
                        <source
                            srcSet={cloudinaryTransform(
                                experiencia.imatge,
                                'w_350,h_150,c_fill,f_avif,q_auto',
                            )}
                            type="image/avif"
                        />
                        <source
                            srcSet={cloudinaryTransform(
                                experiencia.imatge,
                                'w_350,h_150,c_fill,f_webp,q_auto',
                            )}
                            type="image/webp"
                        />
                        <img
                            src={cloudinaryTransform(
                                experiencia.imatge,
                                'w_350,h_150,c_fill,f_auto,q_auto',
                            )}
                            alt={experiencia.titol}
                            loading="lazy"
                            className="h-full w-full object-cover object-center"
                        />
                    </picture>
                </Link>
            </div>

            <div
                id="cardBody"
                className="flex min-h-0 flex-1 flex-col items-start justify-between gap-3 overflow-hidden p-3 sm:flex-row sm:items-center"
            >
                <div className="w-full min-w-0">
                    {/* Titol del viatge */}
                    <Link href={detailUrl} className="block">
                        <h2 className="overflow-hidden break-words text-2xl font-black leading-snug tracking-tight text-principal transition-colors [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] hover:underline dark:text-secundario">
                            {experiencia.titol}
                        </h2>
                    </Link>
                    {/* User */}
                    <p className="mt-1 truncate font-secundaria text-sm font-medium text-gris-ceniza transition-colors dark:text-gris-plata">
                        per {experiencia.usuari?.name ?? 'Usuari'}
                    </p>
                </div>
                <div className="relative h-24 w-full shrink-0 overflow-hidden rounded border border-gris-arena/30 bg-gris-arena/10 transition-colors duration-500 dark:border-gris-ceniza/20 dark:bg-negro-azulada sm:h-full sm:w-[40%]">
                    {/* mapa */}
                    {experiencia.latitud && experiencia.longitud ? (
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${Number.parseFloat(experiencia.latitud)},${Number.parseFloat(experiencia.longitud)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block h-full w-full"
                            aria-label="Obrir ubicació a Google Maps"
                        >
                            <div className="absolute inset-0 z-10 block bg-transparent transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/5" />
                            <Map
                                lat={Number.parseFloat(experiencia.latitud)}
                                lng={Number.parseFloat(experiencia.longitud)}
                            />
                        </a>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400">
                            Mapa no disponible
                        </div>
                    )}
                </div>
            </div>
            <hr className="border-t border-gris-arena/50 transition-colors duration-500 dark:border-gris-ceniza/20" />

            <div
                id="cardFooter"
                className="flex h-12 shrink-0 items-center justify-between px-3 sm:h-[12.5%]"
            >
                <div className="flex gap-4">
                    <LikeButton
                        experienciaId={experiencia.id}
                        userReaction={experiencia.user_reaction ?? 0}
                        likesCount={experiencia.likes_count ?? 0}
                    />
                    <CommentButton count={experiencia.comentaris_count ?? 0} />
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        href={detailUrl}
                        className="rounded bg-principal px-3 py-1 text-xs font-semibold text-blanco-crema transition-colors hover:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:hover:bg-oro-mostaza"
                    >
                        Veure detall
                    </Link>
                    <ReportButton
                        experienciaId={experiencia.id}
                        experienciaCreatorId={experiencia.id_usuari_creador}
                    />
                </div>
            </div>
        </div>
    );
}
