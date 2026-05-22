<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-8 max-w-5xl mx-auto px-4"
         x-data="dashboardRecent()"
         x-init="load()">

        <h3 class="text-lg mb-3">Partides recents</h3>

        <div x-show="flash" x-text="flash" class="mb-4 p-3 border"></div>

        <div x-show="loading" class="p-6 text-center">Carregant…</div>

        <table class="min-w-full border" x-show="!loading && items.length > 0">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium">#</th>
                    <th class="px-4 py-2 text-left text-sm font-medium">Valoració</th>
                    <th class="px-4 py-2 text-left text-sm font-medium">Preguntes</th>
                    <th class="px-4 py-2 text-left text-sm font-medium">Data</th>
                    <th class="px-4 py-2 text-right text-sm font-medium"></th>
                </tr>
            </thead>
            <tbody>
                <template x-for="p in items" :key="p.id">
                    <tr class="border-t">
                        <td class="px-4 py-2" x-text="p.id"></td>
                        <td class="px-4 py-2" x-text="p.valoracio ?? '—'"></td>
                        <td class="px-4 py-2" x-text="p.preguntes?.length ?? 0"></td>
                        <td class="px-4 py-2" x-text="formatDate(p.created_at)"></td>
                        <td class="px-4 py-2 text-right">
                            <a :href="`/partidas/${p.id}`" class="px-2 py-1 border text-sm">Veure</a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>

        <div x-show="!loading && items.length === 0" class="p-6 text-center border">
            <p>Encara no has jugat cap partida.</p>
        </div>
    </div>

    <script>
        function dashboardRecent() {
            return {
                items: [],
                loading: true,
                flash: '',
                async load() {
                    this.loading = true;
                    try {
                        const { data } = await axios.get('/partidas');
                        this.items = data.slice(0, 5);
                    } catch (e) {
                        this.flash = e.userMessage;
                    } finally {
                        this.loading = false;
                    }
                },
                formatDate(s) {
                    if (!s) return '';
                    try { return new Date(s).toLocaleString(); } catch { return s; }
                },
            };
        }
    </script>
</x-app-layout>
