import React from 'react';

export default function CardLayout({ children }) {
    return (
        <section className="w-full max-w-7xl mx-auto px-0 py-8">
            {/* 
                "Mobile First" y Responsive por naturaleza:
                Uso 'flex', 'flex-wrap' y 'justify-center' para que el contenedor calcule automáticamente 
                cuántas tarjetas caben a lo ancho (basado en el ancho fijo de tu tarjeta de 350px).
                Si la pantalla se agranda, cabrán 2, luego 3, luego 4...
                Si no caben, bajan automáticamente a la siguiente fila.
            */}
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                {children}
            </div>
        </section>
    );
}
