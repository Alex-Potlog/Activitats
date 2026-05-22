export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-md border  bg-transparent text-azul-medianoche dark:text-blanco-crema border-gris-ceniza/30 dark:border-gris-ceniza/20 transition-colors duration-500 px-4 py-2 text-xs font-semibold uppercase tracking-widest  shadow-sm transition duration-150 ease-in-out hover:bg-principal/5 dark:hover:bg-secundario/10 focus:outline-none focus:ring-2 focus:ring-principal dark:focus:ring-secundario focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
