import { useCallback } from 'react';
import GuestLayout from '../../Layouts/GuestLayout';
import PlaceAutocomplete from '../../Components/UI/PlaceAutocomplete';
import { useForm } from '@inertiajs/react';
import RichTextEditor from '@/Components/UI/RichTextEditor';

export default function Create({ props }) {
    const categories = props.categories;
    const mapsEnabled = import.meta.env.VITE_ENABLE_MAPS === 'true';

    const { data, setData, post, processing, errors } = useForm({
        titol: '',
        contingut: '',
        ubicacio_nom: '',
        google_place_id: '',
        id_categories: [],
        latitud: '',
        longitud: '',
        imatge: null,
        estat: 'esborrany',
    });

    const categoryError = errors.id_categories || errors['id_categories.0'];

    const handlePlaceSelect = useCallback(
        (place) => {
            if (!place) {
                setData((prev) => ({
                    ...prev,
                    ubicacio_nom: '',
                    google_place_id: '',
                }));
                return;
            }

            setData((prev) => ({
                ...prev,
                ubicacio_nom: place.formatted_address || place.name,
                google_place_id: place.place_id || '',
            }));
        },
        [setData],
    );

    function handleSubmit(e) {
        e.preventDefault();
        post(route('experiencies.store'), { forceFormData: true });
    }

    const baseInputClass =
        'block py-2.5 px-0 w-full text-sm text-azul-medianoche dark:text-blanco-crema transition-colors duration-500 bg-transparent border-0 border-b-2 border-gris-arena/50 dark:border-gris-ceniza/20 appearance-none focus:outline-none focus:ring-0 focus:border-principal dark:focus:border-secundario peer';
    const wrapClass = 'relative z-0 w-full';
    const errorClass = 'mt-1 text-xs text-red-500';

    return (
        <GuestLayout>
            <div className="flex min-h-screen items-center justify-center px-4 py-12">
                <div className="w-full max-w-2xl rounded-2xl bg-white/80 p-10 shadow-lg backdrop-blur-sm transition-colors duration-500 dark:border dark:border-gris-ceniza/10 dark:bg-[#06001a]/95">
                    <h1 className="mb-8 text-2xl font-semibold text-azul-medianoche transition-colors duration-500 dark:text-blanco-crema">
                        Nova experiència
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-8"
                    >
                        {/* Títol */}
                        <div className={wrapClass}>
                            <input
                                type="text"
                                name="titol"
                                placeholder="Títol"
                                maxLength={120}
                                value={data.titol}
                                onChange={(e) =>
                                    setData('titol', e.target.value)
                                }
                                className={baseInputClass}
                            />
                            {errors.titol && (
                                <p className={errorClass}>{errors.titol}</p>
                            )}
                        </div>

                        {/* Contingut */}
                        <div className={wrapClass}>
                            <p className="mb-2 text-sm text-azul-medianoche transition-colors duration-500 dark:text-blanco-crema">
                                Descripció
                            </p>
                            <RichTextEditor
                                value={data.contingut}
                                onChange={(value) =>
                                    setData('contingut', value)
                                }
                                error={errors.contingut}
                            />
                        </div>

                        {/* Ubicació */}
                        <div
                            className={`${wrapClass} ${mapsEnabled ? 'z-10' : ''}`}
                        >
                            {mapsEnabled ? (
                                <PlaceAutocomplete
                                    onPlaceSelect={handlePlaceSelect}
                                    placeholder="Cerca una ubicació"
                                />
                            ) : (
                                <input
                                    type="text"
                                    name="ubicacio_nom"
                                    placeholder="Ubicació"
                                    value={data.ubicacio_nom}
                                    onChange={(e) =>
                                        setData('ubicacio_nom', e.target.value)
                                    }
                                    className={baseInputClass}
                                />
                            )}
                            {errors.ubicacio_nom && (
                                <p className={errorClass}>
                                    {errors.ubicacio_nom}
                                </p>
                            )}
                            {mapsEnabled && data.google_place_id && (
                                <p className="mt-1 text-xs text-gray-500">
                                    Lloc seleccionat
                                </p>
                            )}
                        </div>

                        {/* Categories */}
                        <div className={wrapClass}>
                            <p className="mb-2 text-sm text-azul-medianoche transition-colors duration-500 dark:text-blanco-crema">
                                Selecciona una o més categories
                            </p>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {categories.map((cat) => {
                                    const isChecked =
                                        data.id_categories.includes(cat.id);

                                    return (
                                        <label
                                            key={cat.id}
                                            className="flex items-center gap-2 rounded border border-gris-arena/50 px-3 py-2 text-sm text-azul-medianoche transition-colors duration-500 dark:border-gris-ceniza/20 dark:text-blanco-crema"
                                        >
                                            <input
                                                type="checkbox"
                                                name="id_categories[]"
                                                checked={isChecked}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setData(
                                                            'id_categories',
                                                            [
                                                                ...data.id_categories,
                                                                cat.id,
                                                            ],
                                                        );
                                                        return;
                                                    }

                                                    setData(
                                                        'id_categories',
                                                        data.id_categories.filter(
                                                            (id) =>
                                                                id !== cat.id,
                                                        ),
                                                    );
                                                }}
                                            />
                                            <span>{cat.nom}</span>
                                        </label>
                                    );
                                })}
                            </div>
                            {categoryError && (
                                <p className={errorClass}>{categoryError}</p>
                            )}
                        </div>

                        {/* Latitud / Longitud manual (només en mode estalvi) */}
                        {!mapsEnabled && (
                            <>
                                <div className={wrapClass}>
                                    <input
                                        type="number"
                                        step="0.00000001"
                                        name="latitud"
                                        placeholder="Latitud"
                                        value={data.latitud}
                                        onChange={(e) =>
                                            setData('latitud', e.target.value)
                                        }
                                        className={baseInputClass}
                                    />
                                    {errors.latitud && (
                                        <p className={errorClass}>
                                            {errors.latitud}
                                        </p>
                                    )}
                                </div>

                                <div className={wrapClass}>
                                    <input
                                        type="number"
                                        step="0.00000001"
                                        name="longitud"
                                        placeholder="Longitud"
                                        value={data.longitud}
                                        onChange={(e) =>
                                            setData('longitud', e.target.value)
                                        }
                                        className={baseInputClass}
                                    />
                                    {errors.longitud && (
                                        <p className={errorClass}>
                                            {errors.longitud}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                        {mapsEnabled && (errors.latitud || errors.longitud) && (
                            <p className={errorClass}>
                                {errors.latitud || errors.longitud}
                            </p>
                        )}

                        {/* Estat */}
                        <div className={wrapClass}>
                            <select
                                name="estat"
                                value={data.estat}
                                onChange={(e) =>
                                    setData('estat', e.target.value)
                                }
                                className={baseInputClass}
                            >
                                <option value="esborrany" className="bg-white text-azul-medianoche dark:bg-[#06001a] dark:text-blanco-crema">Esborrany</option>
                                <option value="publicat" className="bg-white text-azul-medianoche dark:bg-[#06001a] dark:text-blanco-crema">Publicat</option>
                            </select>
                            {errors.estat && (
                                <p className={errorClass}>{errors.estat}</p>
                            )}
                        </div>

                        {/* Imatge */}
                        <div className={wrapClass}>
                            <label
                                htmlFor="imatge"
                                className="mb-1 block text-sm text-azul-medianoche transition-colors duration-500 dark:text-blanco-crema"
                            >
                                Imatge
                            </label>
                            <input
                                id="imatge"
                                type="file"
                                name="imatge"
                                accept="image/*"
                                onChange={(e) =>
                                    setData('imatge', e.target.files[0])
                                }
                                className={baseInputClass}
                            />
                            {errors.imatge && (
                                <p className={errorClass}>{errors.imatge}</p>
                            )}
                        </div>

                        {/* Botón */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center rounded-none border border-transparent bg-principal px-6 py-3 text-sm font-semibold uppercase tracking-widest text-blanco-crema transition-colors duration-300 ease-in-out hover:bg-azul-medianoche focus:bg-azul-medianoche focus:outline-none focus:ring-2 focus:ring-principal focus:ring-offset-2 active:bg-azul-medianoche disabled:cursor-not-allowed disabled:opacity-25 dark:bg-secundario dark:text-negro-azulada dark:hover:bg-oro-mostaza dark:focus:bg-oro-mostaza dark:focus:ring-secundario dark:active:bg-bronce-oscuro"
                            >
                                {processing ? 'Creant...' : 'Crear experiència'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
