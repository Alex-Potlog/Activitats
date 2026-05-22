import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 transition-colors duration-300 ease-in-out ${
                active
                    ? 'border-principal bg-principal/10 text-principal dark:border-secundario dark:bg-secundario/10 dark:text-secundario focus:border-azul-medianoche focus:bg-principal/20 focus:text-azul-medianoche dark:focus:border-oro-mostaza dark:focus:bg-secundario/20'
                    : 'border-transparent text-gris-ceniza dark:text-gris-plata hover:border-gris-arena/50 hover:bg-gris-arena/10 hover:text-azul-medianoche dark:hover:border-gris-ceniza/20 dark:hover:bg-gris-plata/10 dark:hover:text-blanco-crema focus:border-gris-arena/50 focus:bg-gris-arena/10 focus:text-azul-medianoche dark:focus:border-gris-ceniza/20 dark:focus:bg-gris-plata/10 dark:focus:text-blanco-crema'
            } text-base font-medium focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
