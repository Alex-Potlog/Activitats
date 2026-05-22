import React from 'react';
import Modal from '../UI/Modal';

export default function ReportModal({ show, onClose, onConfirm }) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-bold text-principal dark:text-secundario">
                    Estàs segur que vols reportar aquesta experiència?
                </h2>
                
                <p className="mt-1 text-sm text-gris-ceniza dark:text-gris-plata">
                    En confirmar, els administradors revisaran la publicació per assegurar-se que no infringeix les normes de la comunitat. Aquesta acció no es pot desfer.
                </p>
                
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gris-plata/30 px-4 py-2 rounded font-medium text-negro-azulada hover:bg-gris-plata/50 transition-colors dark:bg-gris-ceniza/20 dark:text-blanco-crema dark:hover:bg-gris-ceniza/40"
                    >
                        Cancel·lar
                    </button>

                    <button 
                        onClick={onConfirm}
                        className="ml-3 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded transition-colors dark:bg-red-700 dark:hover:bg-red-800"
                    >
                        Confirmar Report
                    </button>
                </div>
            </div>
        </Modal>
    );
}
