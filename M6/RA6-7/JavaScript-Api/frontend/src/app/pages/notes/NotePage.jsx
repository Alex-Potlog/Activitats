"use client";

import Note from "@/app/components/Note.jsx";
import { useEffect, useState } from "react";
import { list } from "@/app/services/note.service.jsx";
import { useRouter } from "next/navigation";

export default function NotePage() {
    // Estat: on guardem les notes del backend
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estat per a gestionar la comprovació de l'autenticació
    const [checking, setChecking] = useState(true);

    //Afegim el router per a redirigir després de crear una nota
    const router = useRouter();

    // Cicle de vida: S'executa una sola vegada quan el component es carrega
    useEffect(() => {
        // Funció asíncrona per obtenir les notes
        const loadNotes = async () => {
            try {
                setLoading(true);
                setError(null);

                //Cridem al servei per obtenir les notes
                const response = await list();

                // Actualitzem l'estat amb les notes obtingudes
                setNotes(response.data.notes || []);

            } catch (err) {
                // Si el backend retorna un error 401, redirigim 
                // a la pàgina de login
                if (err.response?.status === 401) {
                    router.push('/login');
                } else {
                    console.error("Error al carregar les notes:", err);
                    setError("Error al carregar les notes");
                }
            } finally {
                setLoading(false);
                setChecking(false);
            }
        };

        // Comprovem si l'usuari està autenticat abans de carregar les notes
        // i si no ho està, redirigim a la pàgina de login
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
            return;
        }

        //Cridem la funció asincrona
        loadNotes();

    }, [router]); // Les claus buides per a que s'executi només una vegada

    // Renderitzem mentre es carrega
    if (loading) {
        return (
            <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
                <div className="rounded-xl border-2 border-orange-500 bg-orange-300 px-4 py-3 text-sm font-medium text-gray-900 shadow-sm">
                    Carregant notes...
                </div>
            </main>
        );
    }

    // Renderitzem si hi ha un error
    if (error) {
        return (
            <main className="mx-auto max-w-6xl px-6 py-10">
                <div role="alert" className="rounded-xl border-2 border-red-500 bg-red-100 px-4 py-3 text-sm font-medium text-red-700 shadow-sm">
                    {error}
                </div>
            </main>
        );
    }

    // Renderitzem la llista de les notes
    return (
        <main className="mx-auto max-w-6xl px-6 py-10">
            <div className="mb-4">
                <p aria-live="polite" className="text-sm text-slate-600">
                    {loading ? "Carregant dades..." : "Dades carregades correctament"}
                </p>
            </div>
            {/* Capçalera */}
            <div className="mb-8 rounded-xl border-2 border-orange-500 bg-orange-300 p-4 md:p-6 shadow-sm">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Les Meves Notes</h1>
                    <p className="mt-2 text-xs md:text-sm text-gray-700">
                        Total: {notes.length} nota{notes.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <button
                    onClick={() => router.push('/notes/new')}
                    className="mt-4 rounded bg-orange-500 px-4 py-2 text-sm md:text-base text-white hover:bg-orange-600 transition-colors"
                >
                    Crea una nota nova
                </button>
            </div>

            {/* Grilla de notes (3 columnes en desktop, 2 en tablet, 1 en mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <Note key={note._id} note={note} onDelete={(id) => setNotes(notes.filter(n => n._id !== id))} />
                ))}
            </div>

            {/* Missatge si no hi ha notes */}
            {notes.length === 0 && (
                <div className="mt-6 rounded-xl border-2 border-orange-500 bg-white px-4 py-3 shadow-sm">
                    <p className="text-sm text-gray-700">
                        Encara no hi ha notes. Crea la teva primera nota!
                    </p>
                </div>
            )}
        </main>
    );
}