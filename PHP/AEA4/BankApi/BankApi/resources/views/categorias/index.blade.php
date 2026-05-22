<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl leading-tight">{{ __('Categories') }}</h2>
    </x-slot>

    <div class="py-8 max-w-5xl mx-auto px-4"
         x-data="categoriasIndex()"
         x-init="load()">

        <div x-show="flash" x-text="flash" class="mb-4 p-3 border"></div>

        <div class="flex justify-end mb-4">
            <a href="{{ route('categorias.create') }}" class="px-4 py-2 border">
                Nova categoria
            </a>
        </div>

        <table class="min-w-full border" x-show="items.length > 0">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium">Nom</th>
                    <th class="px-4 py-2 text-left text-sm font-medium">Descripció</th>
                    <th class="px-4 py-2 text-right text-sm font-medium">Accions</th>
                </tr>
            </thead>
            <tbody>
                <template x-for="c in items" :key="c.id">
                    <tr class="border-t">
                        <td class="px-4 py-2" x-text="c.nom"></td>
                        <td class="px-4 py-2" x-text="c.descripcio"></td>
                        <td class="px-4 py-2 text-right">
                            <a :href="`/categorias/${c.id}/edit`" class="px-2 py-1 border text-sm">Editar</a>
                            <button type="button" @click="remove(c.id)" class="px-2 py-1 border text-sm">Eliminar</button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>

        <div x-show="!loading && items.length === 0" class="p-6 text-center border">
            <p>Encara no hi ha cap categoria.</p>
        </div>
    </div>

    <script>
        function categoriasIndex() {
            return {
                items: [],
                loading: true,
                flash: '',
                async load() {
                    this.loading = true;
                    try {
                        this.items = (await axios.get('/categorias')).data;
                    } catch (e) {
                        this.flash = e.userMessage;
                    } finally {
                        this.loading = false;
                    }
                },
                async remove(id) {
                    if (!confirm('Eliminar categoria?')) return;
                    try {
                        await axios.delete(`/categorias/${id}`);
                        await this.load();
                    } catch (e) {
                        this.flash = e.userMessage;
                    }
                },
            };
        }
    </script>
</x-app-layout>
