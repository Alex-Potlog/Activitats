import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition-colors duration-300 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-principal text-principal dark:border-secundario dark:text-secundario focus:border-azul-medianoche dark:focus:border-oro-mostaza'
                    : 'border-transparent text-gris-ceniza dark:text-gris-plata hover:border-gris-arena/50 dark:hover:border-gris-ceniza/20 hover:text-azul-medianoche dark:hover:text-blanco-crema focus:border-gris-arena/50 focus:text-azul-medianoche dark:focus:border-gris-ceniza/20 dark:focus:text-blanco-crema') +
                className
            }
        >
            {children}
        </Link>
    );
}
