import React from 'react';
import { router } from '@inertiajs/react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { BiDislike, BiSolidDislike } from 'react-icons/bi';

export default function LikeDislikeButton({
    experienciaId = null,
    userReaction = 0,
    likesCount = 0,
    iconClassName = 'text-azul-medianoche dark:text-gris-plata transition-colors',
    withBackground = false,
}) {
    const isLikeActive = userReaction === 1;
    const isDislikeActive = userReaction === -1;

    const submitReaction = (valoracio) => {
        if (!experienciaId) return;

        router.post(
            route('likes.react', experienciaId),
            { valoracio },
            {
                preserveScroll: true,
            },
        );
    };

    const bgClass = withBackground
        ? 'rounded-full p-2 -m-2 transition-colors hover:bg-gris-ceniza/10 dark:hover:bg-gris-plata/10'
        : '';

    return (
        <div className="flex items-center gap-3">
            {/* Like: botó + comptador */}
            <button
                type="button"
                onClick={() => submitReaction(1)}
                disabled={!experienciaId}
                aria-label="Fer m'agrada"
                aria-pressed={isLikeActive}
                className={`group flex items-center gap-1.5 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${bgClass}`}
            >
                {isLikeActive ? (
                    <GoHeartFill className="h-6 w-6 text-red-500 transition-colors group-hover:text-red-600 dark:group-hover:text-red-400" />
                ) : (
                    <GoHeart
                        className={`h-6 w-6 transition-colors group-hover:text-red-500 dark:group-hover:text-red-400 ${iconClassName}`}
                    />
                )}
                <span
                    className={`font-secundaria text-xs font-semibold tabular-nums transition-colors ${isLikeActive ? 'text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400' : `group-hover:text-red-500 dark:group-hover:text-red-400 ${iconClassName}`}`}
                >
                    {likesCount}
                </span>
            </button>

            <button
                type="button"
                onClick={() => submitReaction(-1)}
                disabled={!experienciaId}
                aria-label="Fer no m'agrada"
                aria-pressed={isDislikeActive}
                className={`group flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${bgClass}`}
            >
                {isDislikeActive ? (
                    <BiSolidDislike className="h-6 w-6 text-principal transition-colors group-hover:opacity-80 dark:text-secundario dark:group-hover:text-oro-mostaza dark:group-hover:opacity-100" />
                ) : (
                    <BiDislike
                        className={`h-6 w-6 transition-colors group-hover:text-principal dark:group-hover:text-secundario ${iconClassName}`}
                    />
                )}
            </button>
        </div>
    );
}
