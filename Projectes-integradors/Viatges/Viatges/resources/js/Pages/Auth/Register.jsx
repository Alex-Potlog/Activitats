import InputError from '@/Components/UI/InputError';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlinePhone } from 'react-icons/hi';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        telefon: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registre" />

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-azul-medianoche dark:text-blanco-crema mb-2 transition-colors duration-500" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Crea el teu compte
                </h2>
                <p className="text-gris-ceniza dark:text-gris-plata text-sm transition-colors duration-500">
                    Introdueix les teves dades per començar a compartir les teves experiències
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Nom */}
                <div className="relative">
                    <div className="flex items-center border-b border-gris-ceniza/30 dark:border-gris-ceniza/20 focus-within:border-principal dark:focus-within:border-secundario transition-colors duration-500">
                        <HiOutlineUser className="text-principal dark:text-secundario transition-colors duration-500 text-xl flex-shrink-0 mr-3" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="flex-1 border-0 border-none shadow-none outline-none ring-0 focus:ring-0 focus:border-none bg-transparent dark:bg-transparent text-azul-medianoche dark:text-blanco-crema placeholder-gris-ceniza dark:placeholder-gris-plata transition-colors duration-500 py-2 rounded-none"
                            placeholder="Nom complet"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-1" />
                </div>

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
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Telefon */}
                <div className="relative">
                    <div className="flex items-center border-b border-gris-ceniza/30 dark:border-gris-ceniza/20 focus-within:border-principal dark:focus-within:border-secundario transition-colors duration-500">
                        <HiOutlinePhone className="text-principal dark:text-secundario transition-colors duration-500 text-xl flex-shrink-0 mr-3" />
                        <TextInput
                            id="telefon"
                            type="tel"
                            name="telefon"
                            value={data.telefon}
                            className="flex-1 border-0 border-none shadow-none outline-none ring-0 focus:ring-0 focus:border-none bg-transparent dark:bg-transparent text-azul-medianoche dark:text-blanco-crema placeholder-gris-ceniza dark:placeholder-gris-plata transition-colors duration-500 py-2 rounded-none"
                            placeholder="Telèfon"
                            autoComplete="tel"
                            onChange={(e) => setData('telefon', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.telefon} className="mt-1" />
                </div>

                {/* Contrasenya */}
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
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Confirmar contrasenya */}
                <div className="relative">
                    <div className="flex items-center border-b border-gris-ceniza/30 dark:border-gris-ceniza/20 focus-within:border-principal dark:focus-within:border-secundario transition-colors duration-500">
                        <HiOutlineLockClosed className="text-principal dark:text-secundario transition-colors duration-500 text-xl flex-shrink-0 mr-3" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="flex-1 border-0 border-none shadow-none outline-none ring-0 focus:ring-0 focus:border-none bg-transparent dark:bg-transparent text-azul-medianoche dark:text-blanco-crema placeholder-gris-ceniza dark:placeholder-gris-plata transition-colors duration-500 py-2 rounded-none"
                            placeholder="Confirma la contrasenya"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                {/* Botó principal */}
                <div className="pt-2">
                    <PrimaryButton disabled={processing}>
                        Registra't
                    </PrimaryButton>
                </div>

                <div className="text-center pt-2">
                    <span className="text-sm text-gris-ceniza dark:text-gris-plata transition-colors duration-500">
                        Ja tens compte?{' '}
                        <Link
                            href={route('login')}
                            className="text-principal dark:text-secundario font-semibold hover:text-azul-medianoche dark:hover:text-blanco-crema underline underline-offset-2 transition-colors duration-200"
                        >
                            Inicia sessió
                        </Link>
                    </span>
                </div>
            </form>
        </GuestLayout>
    );
}
