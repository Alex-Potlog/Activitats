export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded-none border-gris-ceniza text-secundario shadow-sm focus:ring-secundario focus:ring-offset-blanco-crema ' +
                className
            }
        />
    );
}
