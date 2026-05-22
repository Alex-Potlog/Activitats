import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/UI/ThemeToggle';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen dark:bg-negro-azulada">
            <div className="absolute right-4 top-4 z-50">
                <ThemeToggle />
            </div>
            {/* Panel esquerre: imatge hero */}
            <div className="relative hidden overflow-hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2">
                <img
                    src="/images/login_hero.png"
                    alt="Nómada hero"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay degradat */}
                <div className="absolute inset-0 bg-gradient-to-br from-principal/80 via-principal/50 to-transparent" />

                {/* Contingut sobre l'overlay */}
                <div className="relative z-10 flex w-full flex-col justify-between p-12">
                    {/* Logo clicable */}
                    <div>
                        <Link
                            href={route('welcome')}
                            className="inline-flex w-fit items-center gap-2"
                        >
                            <img
                                src="/logoBueno.svg"
                                alt="Nómada logo"
                                className="h-10 w-auto brightness-0 invert"
                            />
                        </Link>
                    </div>

                    {/* Text principal */}
                    <div>
                        <h1
                            className="mb-4 text-5xl font-bold leading-tight text-blanco-crema"
                            style={{ fontFamily: '"Playfair Display", serif' }}
                        >
                            El teu viatge interior
                            <br />
                            comença aquí
                        </h1>
                        <p className="text-lg text-blanco-crema/70">
                            Descobreix experiències úniques arreu del món
                        </p>
                    </div>

                    {/* Decoració inferior */}
                    <div className="flex items-center gap-2">
                        <div className="h-px w-12 bg-secundario" />
                        <span className="text-sm font-semibold uppercase tracking-widest text-secundario">
                            Nomada
                        </span>
                    </div>
                </div>
            </div>

            {/* Panel dret: formulari */}
            <div className="relative flex w-full flex-col items-center justify-start bg-blanco-crema px-8 pb-16 pt-[12vh] transition-colors duration-500 dark:bg-negro-azulada lg:w-1/2 lg:justify-center lg:pb-12 lg:pt-12">
                {/* Fons mòbil que arriba fins a la meitat del logo, amb diagonal perfecta */}

                {/* Sembla molt complicat pero es la manera mes sencilla que vaig trobar per fer l'efecte de la imatge
                en el login, la idea es tracar aquesta imatge com un trapezi i l'unica cosa que es fa es definir les 4 esquines d'aquest
                es fa caculant el paddings que hi ha */}

                <div
                    className="absolute left-0 top-0 z-0 w-full overflow-hidden lg:hidden"
                    style={{
                        height: 'calc(12vh + 3rem + 5vw)',
                        clipPath:
                            'polygon(0 0, 100% 0, 100% calc(100% - 16vw), 0 100%)',
                    }}
                >
                    <img
                        src="/images/login_hero.png"
                        alt="Viatges hero"
                        className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-principal/20" />
                </div>

                {/* Logo per a mobil */}
                <div className="relative z-10 mb-6 lg:hidden">
                    <Link
                        href={route('welcome')}
                        aria-label="Anar a l'inici"
                        title="Anar a l'inici"
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#180165] shadow-lg"
                    >
                        <img
                            src="/logoBueno.svg"
                            alt="Nómada"
                            className="h-12 w-auto brightness-0 invert"
                        />
                    </Link>
                </div>

                <div className="relative z-10 w-full max-w-2xl">{children}</div>

                {/* Decoració inferior per a mòbil */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 lg:hidden">
                    <div className="h-px w-10 bg-secundario" />
                    <span className="text-sm font-bold uppercase text-secundario">
                        Nomada
                    </span>
                </div>
            </div>
        </div>
    );
}
