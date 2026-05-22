import { Head } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import Footer from '@/Components/UI/Footer';

export default function Contact() {
    return (
        <>
            <Head title="Contacte — Nómada" />
            <PanelLayout>
                <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
                    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                            Contacte
                        </h1>
                        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                            Darrera actualització: abril de 2026
                        </p>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Estem aquí per ajudar-te
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                A <strong>Nómada</strong> valorem l'opinió i les consultes dels
                                nostres usuaris. Si tens cap dubte, suggeriment o necessites reportar
                                una incidència, pots posar-te en contacte amb nosaltres a través dels
                                canals següents.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Correu electrònic
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Per a consultes generals, col·laboracions o qüestions administratives,
                                pots escriure'ns a{' '}
                                <a
                                    href="mailto:info@nomada.app"
                                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    info@nomada.app
                                </a>
                                . Intentarem respondre't en un termini màxim de 48 hores laborables.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Suport tècnic
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Si experimentes problemes tècnics amb la plataforma o vols reportar un
                                error, contacta'ns a{' '}
                                <a
                                    href="mailto:suport@nomada.app"
                                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    suport@nomada.app
                                </a>{' '}
                                indicant-nos el màxim de detalls possibles sobre la incidència.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Drets d'autor i infraccions
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Per notificar una possible infracció de drets d'autor o sol·licitar la
                                retirada de contingut, pots escriure'ns a{' '}
                                <a
                                    href="mailto:legal@nomada.app"
                                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    legal@nomada.app
                                </a>{' '}
                                aportant la documentació que acrediti la teva sol·licitud.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Adreça postal
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Nómada
                                <br />
                                Carrer de l'Exemple, 123
                                <br />
                                08001 Barcelona
                                <br />
                                Espanya
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Horari d'atenció
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                De dilluns a divendres, de 9:00 a 18:00 (hora central europea). Les
                                consultes rebudes fora d'aquest horari es respondran el següent dia
                                laborable.
                            </p>
                        </section>

                        <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
                            © {new Date().getFullYear()} Nómada. Tots els drets reservats.
                        </p>
                    </main>
                    <Footer />
                </div>
            </PanelLayout>
        </>
    );
}
