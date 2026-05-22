import React, { useState } from 'react';
import { IoIosWarning } from 'react-icons/io';
import { router, usePage } from '@inertiajs/react';
import ReportModal from '../../Modals/ReportModal';

export default function ReportButton({ experienciaId, experienciaCreatorId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { auth } = usePage().props;

    if (auth?.user?.id === experienciaCreatorId) {
        return null;
    }

    const handleConfirm = () => {
        router.post(
            route('reports.store', experienciaId),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsModalOpen(false);
                },
            },
        );
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>
                <IoIosWarning className="h-6 w-6 text-azul-medianoche transition-colors hover:text-oro-mostaza dark:text-gris-plata dark:hover:text-secundario" />
            </button>

            <ReportModal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </>
    );
}
