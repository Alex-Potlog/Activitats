"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@/app/services/note.service.jsx";
import NoteForm from "@/app/components/NoteForm.jsx";

// Aquest component és per a crear una nova nota, per a editar una nota existent s'utilitza el component de /notes/[id]/page.jsx
export default function NewCreateNotePage() {
    
    // Afegim el router per a redirigir després de crear una nota
    const router = useRouter();

    // Estat per a gestionar les dades del formulari
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        state: 'Draft',
    });

    // Estat per a gestionar l'èxit de la creació
    const [success, setSuccess] = useState(false);

    // Funció per a gestionar el click del formulari de creació
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await upload(formData);
            setSuccess(true);
            setTimeout(() => router.push('/notes'), 1500);
        } catch (error) {
            console.error('Error creant la nota:', error);
        }
    };

    return (
        <main className="mx-auto max-w-2xl px-6 py-10">
            <h1 className="text-3xl font-bold mb-6">Nova Nota</h1>
            {success && (
                <div className="mt-4 rounded bg-green-100 px-4 py-2 text-green-700">
                    Nota creada amb èxit!
                </div>
            )}

            <NoteForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isEditing={false}
            />
        </main>
    );
}