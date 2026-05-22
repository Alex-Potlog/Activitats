"use client"; // Necessari per a l'ús de React Hooks
import { useRouter } from "next/navigation"; // Importem el hook useRouter per a gestionar la navegació
import { del } from "@/app/services/note.service.jsx"; // Assegura't d'importar la funció de servei per eliminar la nota
import { useState } from "react";

export default function Note({ note, onDelete }) {

    // Afegim el router per a redirigir després de crear una nota
    const router = useRouter();

    // Estat per a gestionar l'estat de eliminació
    // I evitar múltiples clics mentre s'elimina una nota
    const [deleting, setDeleting] = useState(false);

    // Funció per a formatar la data de creació de la nota
    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("ca-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    // Funció per a gestionar l'eliminació de la nota
    const handleDelete = async () => {
        if (deleting) return; // Evita múltiples clics

        if (confirm("Segur que vols eliminar aquesta nota?")) {
            try {
                setDeleting(true);
                await del(note._id); // Crida a la funció de servei per eliminar la nota
                onDelete(note._id); // Notifica al component pare que la nota ha estat eliminada
            } catch (error) {
                console.error("Error eliminant la nota:", error);
                alert("Hi ha hagut un error eliminant la nota. Torna-ho a intentar.");
            } finally {
                setDeleting(false);
            }
        }
    }

    return (
        <article className="rounded-xl border-2 border-orange-500 bg-white p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
            <div className="mb-3 flex flex-col sm:flex-row items-start justify-between gap-3">
                <h2 className="text-lg md:text-xl font-bold break-words overflow-hidden flex-1">{note.title}</h2>
                <span className="rounded-full border border-orange-500 bg-orange-300 px-3 py-1 text-xs font-semibold text-gray-900 whitespace-nowrap">
                    {note.state}
                </span>
            </div>

            <p className="text-xs md:text-sm leading-6 text-gray-700 mb-4 line-clamp-3 flex-grow">{note.body}</p>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500 gap-3 pt-4">
                <span>{formatDate(note.dataCreacio)}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => router.push(`/notes/${note._id}`)}
                        className="px-3 py-1 text-orange-600 hover:bg-orange-100 rounded transition text-sm md:text-sm"
                    >
                        Editar
                    </button>
                    <button
                        aria-busy={deleting ? "true" : "false"}
                        onClick={handleDelete}
                        disabled={deleting}
                        className="px-3 py-1 text-red-600 hover:bg-red-100 rounded transition text-sm md:text-sm"
                    >
                        {deleting ? "Eliminant..." : "Eliminar"}
                    </button>
                </div>
            </div>
        </article>
    );
}