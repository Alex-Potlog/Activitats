<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ __('Preguntes') }}</h2>
    </x-slot>

    <div class="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
         x-data="preguntasPage()"
         x-init="load()">

        <div x-show="flash" x-text="flash"
             class="mb-4 bg-red-50 text-red-700 p-3 rounded border border-red-200"></div>

        <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
            <h3 class="text-lg font-medium mb-4"
                x-text="form.id ? 'Editar pregunta' : 'Nova pregunta'"></h3>

            <form @submit.prevent="save()" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Enunciat</label>
                    <input type="text" x-model="form.enunciat"
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    <p class="text-sm text-red-600 mt-1"
                       x-show="errors.enunciat" x-text="errors.enunciat?.[0]"></p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Dificultat</label>
                        <select x-model="form.dificultat"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            <option value="">— Selecciona —</option>
                            <option value="Fàcil">Fàcil</option>
                            <option value="Mitjana">Mitjana</option>
                            <option value="Difícil">Difícil</option>
                        </select>
                        <p class="text-sm text-red-600 mt-1"
                           x-show="errors.dificultat" x-text="errors.dificultat?.[0]"></p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Categoria</label>
                        <select x-model="form.categoria_id"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            <option value="">— Cap —</option>
                            <template x-for="c in categorias" :key="c.id">
                                <option :value="c.id" x-text="c.nom"></option>
                            </template>
                        </select>
                        <p class="text-sm text-red-600 mt-1"
                           x-show="errors.categoria_id" x-text="errors.categoria_id?.[0]"></p>
                    </div>
                </div>

                <div class="flex gap-2">
                    <button type="submit"
                            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            x-text="form.id ? 'Actualitzar' : 'Crear'"></button>
                    <button type="button" x-show="form.id" @click="reset()"
                            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                        Cancel·lar
                    </button>
                </div>
            </form>
        </div>

        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Enunciat</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Dificultat</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Categoria</th>
                        <th class="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <template x-for="p in items" :key="p.id">
                        <tr>
                            <td class="px-4 py-2">
                                <a :href="`/preguntas/${p.id}`"
                                   class="text-indigo-600 hover:underline" x-text="p.enunciat"></a>
                            </td>
                            <td class="px-4 py-2">
                                <span class="inline-block px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700"
                                      x-text="p.dificultat"></span>
                            </td>
                            <td class="px-4 py-2 text-gray-600" x-text="p.categoria?.nom ?? '—'"></td>
                            <td class="px-4 py-2 text-right space-x-2">
                                <button @click="edit(p)" class="text-indigo-600 hover:underline">Editar</button>
                                <button @click="remove(p.id)" class="text-red-600 hover:underline">Eliminar</button>
                            </td>
                        </tr>
                    </template>
                    <tr x-show="items.length === 0">
                        <td colspan="4" class="px-4 py-6 text-center text-gray-500">Cap pregunta.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <script>
        function preguntasPage() {
            return {
                items: [],
                categorias: [],
                form: { id: null, enunciat: '', dificultat: '', categoria_id: '' },
                errors: {},
                flash: '',
                async load() {
                    try {
                        const [p, c] = await Promise.all([
                            axios.get('/preguntas'),
                            axios.get('/categorias'),
                        ]);
                        this.items = p.data;
                        this.categorias = c.data;
                    } catch (e) { this.flash = e.userMessage; }
                },
                edit(p) {
                    this.form = {
                        id: p.id,
                        enunciat: p.enunciat,
                        dificultat: p.dificultat,
                        categoria_id: p.categoria_id ?? '',
                    };
                    this.errors = {};
                },
                reset() {
                    this.form = { id: null, enunciat: '', dificultat: '', categoria_id: '' };
                    this.errors = {};
                },
                async save() {
                    this.errors = {};
                    this.flash = '';
                    const payload = {
                        enunciat: this.form.enunciat,
                        dificultat: this.form.dificultat,
                        categoria_id: this.form.categoria_id || null,
                    };
                    try {
                        if (this.form.id) {
                            await axios.put(`/preguntas/${this.form.id}`, payload);
                        } else {
                            await axios.post('/preguntas', payload);
                        }
                        this.reset();
                        await this.load();
                    } catch (e) {
                        this.errors = e.validationErrors ?? {};
                        if (!e.validationErrors) this.flash = e.userMessage;
                    }
                },
                async remove(id) {
                    if (!confirm('Eliminar pregunta?')) return;
                    try {
                        await axios.delete(`/preguntas/${id}`);
                        await this.load();
                    } catch (e) { this.flash = e.userMessage; }
                },
            };
        }
    </script>
</x-app-layout>
