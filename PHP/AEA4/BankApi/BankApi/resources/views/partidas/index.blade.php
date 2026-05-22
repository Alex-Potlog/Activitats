<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ __('Partides') }}</h2>
    </x-slot>

    <div class="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
         x-data="partidasPage()"
         x-init="load()">

        <div x-show="flash" x-text="flash"
             class="mb-4 bg-red-50 text-red-700 p-3 rounded border border-red-200"></div>

        <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
            <h3 class="text-lg font-medium mb-4">Nova partida</h3>

            <form @submit.prevent="create()" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Preguntes</label>
                    <div class="max-h-64 overflow-y-auto border border-gray-200 rounded-md divide-y">
                        <template x-for="p in preguntes" :key="p.id">
                            <label class="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                                <input type="checkbox" :value="p.id"
                                       x-model="form.selected[p.id]"
                                       class="rounded border-gray-300" />
                                <span class="flex-1" x-text="p.enunciat"></span>
                                <span class="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700"
                                      x-text="p.dificultat"></span>
                            </label>
                        </template>
                        <div x-show="preguntes.length === 0" class="px-3 py-4 text-center text-gray-500 text-sm">
                            No hi ha preguntes. Crea'n alguna a la secció <a href="{{ route('preguntas.index') }}" class="text-indigo-600 hover:underline">Preguntes</a>.
                        </div>
                    </div>
                    <p class="text-sm text-red-600 mt-1"
                       x-show="errors.preguntes" x-text="errors.preguntes?.[0]"></p>
                </div>

                <button type="submit"
                        class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Crear partida
                </button>
            </form>
        </div>

        <div class="bg-white shadow-sm rounded-lg overflow-hidden" x-show="items.length > 0">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Puntuació</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Preguntes</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                        <th class="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <template x-for="p in items" :key="p.id">
                        <tr>
                            <td class="px-4 py-2 text-gray-900"
                                x-text="p.valoracio !== null && p.valoracio !== undefined ? (p.valoracio + ' / ' + (p.preguntes?.length ?? 0)) : '— sense jugar'"></td>
                            <td class="px-4 py-2 text-gray-600" x-text="(p.preguntes?.length ?? 0) + ' preguntes'"></td>
                            <td class="px-4 py-2 text-gray-500 text-sm"
                                x-text="p.created_at ? new Date(p.created_at).toLocaleString() : ''"></td>
                            <td class="px-4 py-2 text-right space-x-2">
                                <a :href="`/partidas/${p.id}`" class="text-indigo-600 hover:underline">Veure</a>
                                <button @click="remove(p.id)" class="text-red-600 hover:underline">Eliminar</button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

        <div x-show="items.length === 0"
             class="bg-white shadow-sm rounded-lg p-10 text-center">
            <p class="text-gray-700 text-lg font-medium">Encara no tens cap partida.</p>
            <p class="text-gray-500 text-sm mt-1">Crea la teva primera partida amb el formulari de dalt.</p>
        </div>
    </div>

    <script>
        function partidasPage() {
            return {
                items: [],
                preguntes: [],
                form: { selected: {} },
                errors: {},
                flash: '',
                async load() {
                    try {
                        const [p, q] = await Promise.all([
                            axios.get('/partidas'),
                            axios.get('/preguntas'),
                        ]);
                        this.items = p.data;
                        this.preguntes = q.data;
                    } catch (e) { this.flash = e.userMessage; }
                },
                async create() {
                    this.errors = {};
                    this.flash = '';
                    const preguntes = Object.keys(this.form.selected)
                        .filter(k => this.form.selected[k])
                        .map(id => ({ id: Number(id) }));
                    try {
                        await axios.post('/partidas', {
                            preguntes,
                        });
                        this.form = { selected: {} };
                        await this.load();
                    } catch (e) {
                        this.errors = e.validationErrors ?? {};
                        if (!e.validationErrors) this.flash = e.userMessage;
                    }
                },
                async remove(id) {
                    if (!confirm('Eliminar partida?')) return;
                    try {
                        await axios.delete(`/partidas/${id}`);
                        await this.load();
                    } catch (e) { this.flash = e.userMessage; }
                },
            };
        }
    </script>
</x-app-layout>
