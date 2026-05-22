import InputError from '@/Components/UI/InputError';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Contrasenya Oblidada" />

            <div className="mb-4 text-sm text-gray-600">
                Has oblidat la teva contrasenya? Cap problema. Deixa&apos;ns
                saber el teu correu electrònic i t&apos;enviarem un correu amb
                un enllaç per reiniciar la teva contrasenya.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enllaç de Correu per Reiniciar la Contrasenya
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
