<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">{{ __('Detall de la pregunta') }}</h2>
            <a href="{{ route('preguntas.index') }}" class="text-sm text-indigo-600 hover:underline">← Tornar</a>
        </div>
    </x-slot>

    <div class="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
         x-data="preguntaShow({{ (int) $preguntaId }})"
         x-init="load()">

        <div x-show="flash" x-text="flash"
             class="mb-4 bg-red-50 text-red-700 p-3 rounded border border-red-200"></div>

        <div class="bg-white shadow-sm rounded-lg p-6 mb-6" x-show="pregunta">
            <h3 class="text-lg font-semibold text-gray-900" x-text="pregunta?.enunciat"></h3>
            <div class="mt-2 flex gap-2 text-sm text-gray-600">
                <span class="inline-block px-2 py-0.5 rounded bg-gray-100"
                      x-text="pregunta?.dificultat"></span>
                <span x-show="pregunta?.categoria"
                      class="inline-block px-2 py-0.5 rounded bg-indigo-50 text-indigo-700"
                      x-text="pregunta?.categoria?.nom"></span>
            </div>
        </div>

        <div class="bg-white shadow-sm rounded-lg p-6 mb-6">
            <h3 class="text-lg font-medium mb-4">Respostes</h3>

            <ul class="divide-y divide-gray-200">
                <template x-for="r in respostes" :key="r.id">
                    <li class="py-3">
                        <div x-show="editing?.id !== r.id" class="flex items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <span :class="r.es_correcta ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
                                      class="text-xs px-2 py-0.5 rounded"
                                      x-text="r.es_correcta ? 'Correcta' : 'Incorrecta'"></span>
                                <span x-text="r.text"></span>
                            </div>
                            <div class="space-x-2 shrink-0">
                                <button @click="startEdit(r)" class="text-indigo-600 hover:underline text-sm">Editar</button>
                                <button @click="removeR(r.id)" class="text-red-600 hover:underline text-sm">Eliminar</button>
                            </div>
                        </div>

                        <div x-show="editing?.id === r.id" class="space-y-2">
                            <input type="text" x-model="editing.text"
                                   class="block w-full rounded-md border-gray-300 shadow-sm" />
                            <label class="inline-flex items-center gap-2 text-sm">
                                <input type="checkbox" x-model="editing.es_correcta"
                                       class="rounded border-gray-300" />
                                Correcta
                            </label>
                            <div class="flex gap-2">
                                <button @click="saveR()"
                                        class="px-3 py-1 bg-indigo-600 text-white rounded">Desar</button>
                                <button @click="editing = null"
                                        class="px-3 py-1 bg-gray-200 rounded">Cancel·lar</button>
                            </div>
                        </div>
                    </li>
                </template>
                <li x-show="respostes.length === 0" class="py-3 text-gray-500">Cap resposta encara.</li>
            </ul>
        </div>

        <div class="bg-white shadow-sm rounded-lg p-6">
            <h3 class="text-lg font-medium mb-4">Afegir resposta</h3>
            <form @submit.prevent="addR()" class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Text</label>
                    <input type="text" x-model="newR.text"
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    <p class="text-sm text-red-600 mt-1"
                       x-show="errors.text" x-text="errors.text?.[0]"></p>
                </div>
                <label class="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" x-model="newR.es_correcta" class="rounded border-gray-300" />
                    Correcta
                </label>
                <p class="text-sm text-red-600"
                   x-show="errors.es_correcta" x-text="errors.es_correcta?.[0]"></p>
                <div>
                    <button type="submit"
                            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        Afegir
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        function preguntaShow(preguntaId) {
            return {
                preguntaId,
                pregunta: null,
                respostes: [],
                newR: { text: '', es_correcta: false },
                editing: null,
                errors: {},
                flash: '',
                async load() {
                    try {
                        const r = await axios.get(`/preguntas/${this.preguntaId}`);
                        this.pregunta = r.data;
                        this.respostes = r.data.respostes ?? [];
                    } catch (e) { this.flash = e.userMessage; }
                },
                async addR() {
                    this.errors = {};
                    this.flash = '';
                    try {
                        await axios.post(`/preguntas/${this.preguntaId}/respostas`, this.newR);
                        this.newR = { text: '', es_correcta: false };
                        await this.load();
                    } catch (e) {
                        this.errors = e.validationErrors ?? {};
                        if (!e.validationErrors) this.flash = e.userMessage;
                    }
                },
                startEdit(r) {
                    this.editing = { id: r.id, text: r.text, es_correcta: !!r.es_correcta };
                },
                async saveR() {
                    try {
                        await axios.put(`/respostas/${this.editing.id}`, {
                            text: this.editing.text,
                            es_correcta: this.editing.es_correcta,
                        });
                        this.editing = null;
                        await this.load();
                    } catch (e) { this.flash = e.userMessage; }
                },
                async removeR(id) {
                    if (!confirm('Eliminar resposta?')) return;
                    try {
                        await axios.delete(`/respostas/${id}`);
                        await this.load();
                    } catch (e) { this.flash = e.userMessage; }
                },
            };
        }
    </script>
</x-app-layout>
