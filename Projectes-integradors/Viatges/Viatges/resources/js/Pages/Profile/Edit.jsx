import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            
        >
            <Head title="Perfil" />

            <div className="py-12 bg-blanco-crema dark:bg-negro-azulada transition-colors duration-500 min-h-screen">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 pb-6 sm:pb-0">
                    <div className="bg-white dark:bg-[#06001a] border border-transparent dark:border-gris-ceniza/10 shadow-sm sm:rounded-none p-4 sm:p-8 transition-colors duration-500">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white dark:bg-[#06001a] border border-transparent dark:border-gris-ceniza/10 shadow-sm sm:rounded-none p-4 sm:p-8 transition-colors duration-500">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white dark:bg-[#06001a] border border-transparent dark:border-gris-ceniza/10 shadow-sm sm:rounded-none p-4 sm:p-8 transition-colors duration-500">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
