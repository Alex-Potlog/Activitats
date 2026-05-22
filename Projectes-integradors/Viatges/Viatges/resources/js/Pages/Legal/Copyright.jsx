import { Head } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import Footer from '@/Components/UI/Footer';

export default function Copyright() {
    return (
        <>
            <Head title="Copyright — Nómada" />
            <PanelLayout>
                <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
                    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                            Drets d'autor
                        </h1>
                        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                            Darrera actualització: abril de 2026
                        </p>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Propietat intel·lectual
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Tot el contingut present a la plataforma <strong>Nómada</strong> —
                                incloent-hi textos, imatges, logotips, dissenys i codi font — és
                                propietat de Nómada o dels seus respectius autors i es troba
                                protegit per la legislació vigent en matèria de propietat
                                intel·lectual i drets d'autor.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Contingut generat pels usuaris
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Les experiències, fotografies i textos publicats pels usuaris
                                continuen sent propietat dels seus autors. En publicar contingut a
                                Nómada, l'usuari atorga a la plataforma una llicència no exclusiva,
                                gratuïta i mundial per mostrar, distribuir i reproduir dit contingut
                                dins del servei.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Ús permès
                            </h2>
                            <p className="mb-3 text-gray-600 dark:text-gray-400">
                                Està permès:
                            </p>
                            <ul className="list-disc space-y-1 pl-6 text-gray-600 dark:text-gray-400">
                                <li>Visualitzar i compartir contingut públic de la plataforma amb fins personals i no comercials.</li>
                                <li>Citar continguts fent referència explícita a la font i a l'autor original.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Ús no permès
                            </h2>
                            <p className="mb-3 text-gray-600 dark:text-gray-400">
                                Queda expressament prohibit:
                            </p>
                            <ul className="list-disc space-y-1 pl-6 text-gray-600 dark:text-gray-400">
                                <li>Reproduir, copiar o distribuir qualsevol contingut de la plataforma amb fins comercials sense autorització prèvia.</li>
                                <li>Modificar o crear obres derivades a partir del contingut de Nómada sense el consentiment dels titulars dels drets.</li>
                                <li>Utilitzar marques, logotips o elements visuals de Nómada sense permís exprés.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Notificació d'infracció
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Si creus que algun contingut publicat a Nómada vulnera els teus
                                drets d'autor, posa't en contacte amb nosaltres a través de la
                                plataforma i revisarem la teva sol·licitud el més aviat possible.
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
