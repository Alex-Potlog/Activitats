"use client";

export default function NoteForm({ formData, setFormData, onSubmit, isEditing, saving }) {
    return (
        <form onSubmit={onSubmit} className="max-w-3xl">
            <input
                type="text"
                placeholder="Títol"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded border border-orange-500 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
            />
            <textarea
                placeholder="Contingut"
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="w-full rounded border border-orange-500 px-3 py-2 min-h-40 text-base mt-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
            />
            <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full rounded border border-orange-500 px-3 py-2 mt-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
            </select>
            <button
                aria-busy={saving ? "true" : "false"}
                type="submit"
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
                {saving ? "Desant..." : (isEditing ? "Editar la nota" : "Guardar nota")}
            </button>
        </form>

    );
}