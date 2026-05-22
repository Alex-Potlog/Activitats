import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            telefon: user.telefon,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-azul-medianoche dark:text-blanco-crema transition-colors duration-500">
                    Informació de Perfil
                </h2>

                <p className="mt-1 text-sm text-gris-ceniza dark:text-gris-plata transition-colors duration-500">
                    Actualitza la teva informació de perfil i el teu correu
                    electrònic.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nom Complet" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="telefon" value="Telèfon" />

                    <TextInput
                        id="telefon"
                        className="mt-1 block w-full"
                        value={data.telefon}
                        onChange={(e) => setData('telefon', e.target.value)}
                        required
                        isFocused
                        autoComplete="telefon"
                    />

                    <InputError className="mt-2" message={errors.telefon} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correu Electrònic" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gris-ceniza dark:text-gris-plata transition-colors duration-500">
                            El teu correu electrònic no està validat.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gris-ceniza dark:text-gris-plata transition-colors duration-500 underline hover:text-azul-medianoche dark:text-blanco-crema transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-principal dark:focus:ring-secundario focus:ring-offset-2"
                            >
                                Fes clic aquí per reenviar la teva verificació
                                de correu electrònic.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                Un nou enllaç de verificació ha sigut enviat al
                                teu correu electrònic.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gris-ceniza dark:text-gris-plata transition-colors duration-500">Guardada.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
