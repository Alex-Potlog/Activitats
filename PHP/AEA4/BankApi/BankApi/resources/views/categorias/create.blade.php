<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl leading-tight">{{ __('Nova categoria') }}</h2>
    </x-slot>

    <div class="py-8 max-w-2xl mx-auto px-4" x-data="categoriaCreate()">

        <div x-show="flash" x-text="flash" class="mb-4 p-3 border"></div>

        <form @submit.prevent="save()" class="space-y-4">
            <div>
                <label class="block text-sm">Nom</label>
                <input type="text" x-model="form.nom" class="mt-1 block w-full border px-2 py-1" />
                <p class="text-sm mt-1" x-show="errors.nom" x-text="errors.nom?.[0]"></p>
            </div>

            <div>
                <label class="block text-sm">Descripció</label>
                <textarea x-model="form.descripcio" rows="3" class="mt-1 block w-full border px-2 py-1"></textarea>
                <p class="text-sm mt-1" x-show="errors.descripcio" x-text="errors.descripcio?.[0]"></p>
            </div>

            <div class="flex gap-2">
                <button type="submit" :disabled="saving" class="px-4 py-2 border">Crear</button>
                <a href="{{ route('categorias.index') }}" class="px-4 py-2 border">Cancel·lar</a>
            </div>
        </form>
    </div>

    <script>
        function categoriaCreate() {
            return {
                form: { nom: '', descripcio: '' },
                errors: {},
                flash: '',
                saving: false,
                async save() {
                    this.errors = {};
                    this.flash = '';
                    this.saving = true;
                    try {
                        await axios.post('/categorias', this.form);
                        window.location.href = '{{ route('categorias.index') }}';
                    } catch (e) {
                        this.errors = e.validationErrors ?? {};
                        if (!e.validationErrors) this.flash = e.userMessage;
                    } finally {
                        this.saving = false;
                    }
                },
            };
        }
    </script>
</x-app-layout>
