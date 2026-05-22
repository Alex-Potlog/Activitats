// Aquest fitxer s'inclou a la ruta /notes/[id] perquè 
// és una pàgina dinàmica, és a dir, cada nota tindrà el seu
// propi ID i d'aquesta manera totes les notes independentment
// del seu ID es renderitzaran amb aquest component.
// Next.js passa l'ID de la URL com a paràmetre mitjançant { params }.
"use client";

import { useEffect, useState, use } from "react";
import { edit, getOne } from "@/app/services/note.service.jsx";
import { useRouter } from "next/navigation";
import NoteForm from "@/app/components/NoteForm.jsx";

// Aquest component és per a editar una nota existent, per a crear una nova nota s'utilitza el component de /notes/new/page.jsx
export default function EditNotePage({ params }) {
    const router = useRouter();

    // Obtenim l'ID de la nota a editar des dels paràmetres de la URL    
    const { id: noteId } = use(params);

    // Estat per a gestionar l'èxit de l'edició
    const [success, setSuccess] = useState(false);

    // Estat per a gestionar les dades del formulari
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        state: 'Draft',
    });

    // Funció per a gestionar la submissió del formulari d'edició
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await edit({ _id: noteId, ...formData });
            router.push('/notes');
        } catch (error) {
            console.error('Error editant la nota:', error);
        }
    };

    // Cicle de vida: S'executa una sola vegada quan el component es carrega
    useEffect(() => {
        // Funció per carregar les dades de la nota a editar
        const loadNote = async () => {
            try {
                const response = await getOne(noteId);
                const note = response.data.note;
                setFormData({
                    title: note.title,
                    body: note.body,
                    state: note.state,
                });
            } catch (error) {
                console.error('Error carregant la nota:', error);
            }
        };

        loadNote();
    }, [noteId]);

    return (
        <main className="mx-auto max-w-2xl px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Editar nota</h1>
            {success && (
                <div className="mt-4 rounded bg-green-100 px-4 py-2 text-green-700">
                    Nota editada amb èxit!
                </div>
            )}

            <NoteForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isEditing={true}
            />
        </main>
    );
}