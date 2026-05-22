import { Link } from '@inertiajs/react';

const Footer = () => {
    return (
        <footer className="bg-blanco-crema dark:bg-[#06001a] transition-colors duration-500 shadow-sm border-t border-gris-ceniza/20 dark:border-gris-ceniza/10 mt-auto">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logoBueno.svg" className="h-7 dark:brightness-0 dark:invert transition-all duration-500" alt="Nómada" />
                        <span className="text-azul-medianoche dark:text-blanco-crema self-center text-2xl font-semibold whitespace-nowrap transition-colors duration-500">Nómada</span>
                    </a>
                    <ul className="mb-0 flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-gris-ceniza transition-colors duration-500 dark:text-gris-plata sm:w-auto sm:justify-end sm:gap-x-6">
                        <li>
                            <Link href={route('categorias.list')} className="hover:underline">Llistat categories</Link>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">Explorar experiencias</a>
                        </li>
                        <li>
                            <Link href={route('legal.copyright')} className="hover:underline">Política de privacidad</Link>
                        </li>
                        <li>
                            <Link href={route('legal.license')} className="hover:underline">Licencia</Link>
                        </li>
                        <li>
                            <Link href={route('legal.Contact')} className="hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gris-ceniza/20 dark:border-gris-ceniza/10 sm:mx-auto lg:my-8 transition-colors duration-500" />
                <span className="block text-sm text-gris-ceniza dark:text-gris-plata sm:text-center transition-colors duration-500">© 2023 <a href="/" className="hover:underline hover:text-azul-medianoche dark:hover:text-blanco-crema">Nómada™</a>. Todos los derechos reservados.</span>
            </div>
        </footer>
    );
};

export default Footer;