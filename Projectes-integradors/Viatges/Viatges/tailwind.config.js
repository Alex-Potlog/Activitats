import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Playfair Display"', ...defaultTheme.fontFamily.sans],
                // cambiar si utizamos otro secundaria
                secundaria: ['"Roboto"', 'sans-serif'],
            },
            colors: {
                principal: '#403075',
                secundario: '#aa9639',
                'azul-medianoche': '#180165',
                'negro-azulada': '#0a012c',
                'gris-ceniza': '#828186',
                'gris-plata': '#bebcc3',
                'blanco-crema': '#fffdf4',
                'gris-arena': '#c2c0ba',
                'oro-mostaza': '#927800',
                'bronce-oscuro': '#403400',
            },
        },
    },

    plugins: [forms],
};
