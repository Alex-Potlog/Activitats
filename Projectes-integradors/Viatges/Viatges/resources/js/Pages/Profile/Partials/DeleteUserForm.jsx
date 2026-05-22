import DangerButton from '@/Components/UI/DangerButton';
import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import Modal from '@/Components/UI/Modal';
import SecondaryButton from '@/Components/UI/SecondaryButton';
import TextInput from '@/Components/UI/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-azul-medianoche dark:text-blanco-crema transition-colors duration-500">
                    Esborrar Compte
                </h2>

                <p className="mt-1 text-sm text-gris-ceniza dark:text-gris-plata transition-colors duration-500">
                    Una vegada el teu compte sigui eliminat, tots els seus
                    recursos i dades seran eliminats permanentment. Abans
                    d&apos;eliminar el teu compte, sisplau descarrega qualsevol
                    dada o informació que desitgis mantenir.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Esborrar Compte
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-azul-medianoche dark:text-blanco-crema transition-colors duration-500">
                        Estàs segur que vols eliminar el teu compte?
                    </h2>

                    <p className="mt-1 text-sm text-gris-ceniza dark:text-gris-plata transition-colors duration-500">
                        Una vegada el teu compte sigui eliminat, tots els seus
                        recursos i dades seran eliminats permanentment. Sisplau
                        introdueix la teva contrasenya per confirmar que vols
                        eliminar el teu compte permanentment.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Contrasenya"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel·lar
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Esborrar Compte
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
