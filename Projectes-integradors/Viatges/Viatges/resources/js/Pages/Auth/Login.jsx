import InputError from '@/Components/UI/InputError';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { SiApple } from 'react-icons/si';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sessió" />

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-azul-medianoche dark:text-blanco-crema mb-2 transition-colors duration-500" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Benvingut a Nomada
                </h2>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email */}
                <div className="relative">
                    <div className="flex items-center border-b border-gris-ceniza/30 dark:border-gris-ceniza/20 focus-within:border-principal dark:focus-within:border-secundario transition-colors duration-500">
                        <HiOutlineMail className="text-principal dark:text-secundario transition-colors duration-500 text-xl flex-shrink-0 mr-3" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="flex-1 border-0 border-none shadow-none outline-none ring-0 focus:ring-0 focus:border-none bg-transparent dark:bg-transparent text-azul-medianoche dark:text-blanco-crema placeholder-gris-ceniza dark:placeholder-gris-plata transition-colors duration-500 py-2 rounded-none"
                            placeholder="Correu electrònic"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Password */}
                <div className="relative">
                    <div className="flex items-center border-b border-gris-ceniza/30 dark:border-gris-ceniza/20 focus-within:border-principal dark:focus-within:border-secundario transition-colors duration-500">
                        <HiOutlineLockClosed className="text-principal dark:text-secundario transition-colors duration-500 text-xl flex-shrink-0 mr-3" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="flex-1 border-0 border-none shadow-none outline-none ring-0 focus:ring-0 focus:border-none bg-transparent dark:bg-transparent text-azul-medianoche dark:text-blanco-crema placeholder-gris-ceniza dark:placeholder-gris-plata transition-colors duration-500 py-2 rounded-none"
                            placeholder="Contrasenya"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Botó principal */}
                <div className="pt-2">
                    <PrimaryButton disabled={processing}>
                        Entrar
                    </PrimaryButton>
                </div>

                <div className="text-center pt-2">
                    <span className="text-sm text-gris-ceniza dark:text-gris-plata transition-colors duration-500">
                        Encara no tens compte?{' '}
                        <Link
                            href={route('register')}
                            className="text-principal dark:text-secundario font-semibold hover:text-azul-medianoche dark:hover:text-blanco-crema underline underline-offset-2 transition-colors duration-200"
                        >
                            Registra't
                        </Link>
                    </span>
                </div>
            </form>
        </GuestLayout>
    );
}
