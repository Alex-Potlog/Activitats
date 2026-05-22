export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `w-full flex items-center justify-center rounded-none border border-transparent bg-principal px-6 py-3 text-sm font-semibold uppercase tracking-widest text-blanco-crema transition-colors duration-300 ease-in-out hover:bg-azul-medianoche focus:bg-azul-medianoche dark:bg-secundario dark:text-negro-azulada dark:hover:bg-oro-mostaza dark:focus:bg-oro-mostaza focus:outline-none focus:ring-2 focus:ring-principal dark:focus:ring-secundario focus:ring-offset-2 active:bg-azul-medianoche dark:active:bg-bronce-oscuro ${disabled ? 'opacity-25 cursor-not-allowed' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
