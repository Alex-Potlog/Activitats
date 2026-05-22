<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Partida') }} <span x-text="'#' + partidaId"></span>
            </h2>
            <a href="{{ route('partidas.index') }}" class="text-sm text-indigo-600 hover:underline">← Tornar</a>
        </div>
    </x-slot>

    <div class="py-8 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
         x-data="partidaShow({{ (int) $partidaId }})"
         x-init="load()">

        <div x-show="flash" x-text="flash"
             class="mb-4 bg-red-50 text-red-700 p-3 rounded border border-red-200"></div>

        <div class="mb-6 text-2xl font-semibold text-gray-800" x-show="partida">
            Partida #<span x-text="partida?.id"></span>
        </div>

        <div class="space-y-6" x-show="partida">
            <template x-for="(p, idx) in partida?.preguntes ?? []" :key="p.id">
                <div class="bg-blue-400 rounded-2xl p-5 shadow-sm">
                    <p class="text-gray-900 font-medium mb-4">
                        <span x-text="'Pregunta ' + (idx + 1) + ': '"></span>
                        <span x-text="p.enunciat"></span>
                    </p>
                    <div class="space-y-3">
                        <template x-for="r in p.respostes ?? []" :key="r.id">
                            <button type="button"
                                    @click="select(p.id, r.id)"
                                    :disabled="answered(p.id)"
                                    :class="answerClasses(p, r)"
                                    class="block w-full text-center px-4 py-2 rounded-md border border-blue-300/60 font-medium transition disabled:cursor-default">
                                <span x-text="r.text"></span>
                            </button>
                        </template>
                        <p x-show="(p.respostes ?? []).length === 0" class="text-sm text-blue-50">
                            Aquesta pregunta no té respostes.
                        </p>
                    </div>
                </div>
            </template>

            <div x-show="(partida?.preguntes ?? []).length === 0"
                 class="bg-white shadow-sm rounded-lg p-10 text-center text-gray-500">
                Aquesta partida no té preguntes.
            </div>
        </div>

        <div class="mt-8 bg-white shadow-sm rounded-lg p-6" x-show="partida && allAnswered()">
            <p class="text-lg font-medium text-gray-800">
                Puntuació: <span x-text="score()"></span> / <span x-text="(partida?.preguntes ?? []).length"></span>
            </p>
            <p class="text-sm text-gray-500 mt-1" x-show="saved">Puntuació desada ✓</p>
            <p class="text-sm text-red-600 mt-1" x-show="saveError" x-text="saveError"></p>

            <div class="mt-4">
                <button type="button" @click="reset()"
                        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                    Tornar a jugar
                </button>
            </div>
        </div>
    </div>

    <script>
        function partidaShow(partidaId) {
            return {
                partidaId,
                partida: null,
                saved: false,
                saveError: '',
                flash: '',
                selections: {},
                async load() {
                    try {
                        const r = await axios.get(`/partidas/${this.partidaId}`);
                        this.partida = r.data;
                        (this.partida.preguntes ?? []).forEach(p => {
                            p.respostes = this.shuffle(p.respostes ?? []);
                        });
                        this.selections = {};
                        this.saved = false;
                        this.saveError = '';
                    } catch (e) { this.flash = e.userMessage; }
                },
                select(preguntaId, respostaId) {
                    if (this.selections[preguntaId] !== undefined) return;
                    this.selections = { ...this.selections, [preguntaId]: respostaId };
                    if (this.allAnswered()) {
                        this.submitScore();
                    }
                },
                answered(preguntaId) {
                    return this.selections[preguntaId] !== undefined;
                },
                answerClasses(pregunta, resposta) {
                    if (!this.answered(pregunta.id)) {
                        return 'bg-blue-300/40 hover:bg-blue-300/70 text-gray-900';
                    }
                    const selectedId = this.selections[pregunta.id];
                    if (resposta.es_correcta) {
                        return 'bg-green-500 text-white border-green-600';
                    }
                    if (resposta.id === selectedId) {
                        return 'bg-red-600 text-white border-red-700';
                    }
                    return 'bg-blue-300/30 text-gray-700';
                },
                allAnswered() {
                    const qs = this.partida?.preguntes ?? [];
                    return qs.length > 0 && qs.every(p => this.answered(p.id));
                },
                score() {
                    const qs = this.partida?.preguntes ?? [];
                    return qs.reduce((acc, p) => {
                        const sel = this.selections[p.id];
                        const correct = (p.respostes ?? []).find(r => r.id === sel)?.es_correcta;
                        return acc + (correct ? 1 : 0);
                    }, 0);
                },
                reset() {
                    (this.partida?.preguntes ?? []).forEach(p => {
                        p.respostes = this.shuffle(p.respostes ?? []);
                    });
                    this.selections = {};
                    this.saved = false;
                    this.saveError = '';
                },
                async submitScore() {
                    try {
                        const r = await axios.put(`/partidas/${this.partidaId}`, { valoracio: this.score() });
                        this.partida.valoracio = r.data?.data?.valoracio ?? this.score();
                        this.saved = true;
                    } catch (e) {
                        this.saveError = e.userMessage ?? 'No s\'ha pogut desar la puntuació';
                    }
                },
                shuffle(arr) {
                    const a = [...arr];
                    for (let i = a.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [a[i], a[j]] = [a[j], a[i]];
                    }
                    return a;
                },
            };
        }
    </script>
</x-app-layout>
