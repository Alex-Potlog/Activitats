import { Head } from '@inertiajs/react';
import PanelLayout from '@/Layouts/PanelLayout';
import Footer from '@/Components/UI/Footer';

export default function License() {
    return (
        <>
            <Head title="Llicència — Nómada" />
            <PanelLayout>
                <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
                    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                            Llicència d'ús
                        </h1>
                        <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                            Darrera actualització: abril de 2026
                        </p>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Condicions generals
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                L'ús de la plataforma <strong>Nómada</strong> es regeix per les
                                condicions descrites en aquest document. En accedir al servei,
                                l'usuari accepta complir aquestes condicions i fer-ne un ús
                                responsable i conforme a la legislació vigent.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Llicència concedida a l'usuari
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Nómada atorga a l'usuari una llicència limitada, no exclusiva,
                                intransferible i revocable per accedir i utilitzar la plataforma amb
                                finalitats personals i no comercials. Aquesta llicència no implica la
                                cessió de cap dret de propietat sobre el servei ni sobre els seus
                                continguts.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Contingut publicat pels usuaris
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                En publicar experiències, fotografies o comentaris, l'usuari concedeix
                                a Nómada una llicència gratuïta, mundial i no exclusiva per mostrar,
                                reproduir i distribuir aquest contingut dins del servei, amb
                                l'objectiu de facilitar-ne la visibilitat a la resta de la comunitat.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Restriccions
                            </h2>
                            <p className="mb-3 text-gray-600 dark:text-gray-400">
                                L'usuari es compromet a no:
                            </p>
                            <ul className="list-disc space-y-1 pl-6 text-gray-600 dark:text-gray-400">
                                <li>Utilitzar la plataforma per a finalitats il·lícites, fraudulentes o contràries a la bona fe.</li>
                                <li>Intentar accedir, alterar o manipular el codi font, les bases de dades o la infraestructura del servei.</li>
                                <li>Revendre, sublicenciar o explotar comercialment cap part del servei sense autorització prèvia.</li>
                                <li>Publicar contingut que infringeixi drets de tercers o vulneri la legislació aplicable.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Durada i finalització
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Aquesta llicència té vigència mentre l'usuari mantingui el seu compte
                                actiu i compleixi les condicions establertes. Nómada es reserva el
                                dret de suspendre o cancel·lar l'accés a qualsevol usuari que
                                n'incompleixi els termes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-200">
                                Limitació de responsabilitat
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                El servei es proporciona "tal com és", sense garanties de cap tipus.
                                Nómada no es fa responsable dels danys directes o indirectes derivats
                                de l'ús de la plataforma ni de la veracitat del contingut publicat
                                pels usuaris.
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
