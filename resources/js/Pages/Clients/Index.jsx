import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { useState } from 'react';
import ClientModal from '@/Components/Modals/ClientModal';

export default function Clients({ clients }) {
    const [showModal, setShowModal] = useState(false);

    const columns = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'direccion', label: 'Dirección' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'email', label: 'Email' },
        { key: 'created_at', label: 'Fecha de Registro' }
    ];

    const handleRowClick = (client) => {
        // TODO: Implement client details view
        console.log('Client clicked:', client);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Clientes
                </h2>
            }
        >
            <Head title="Clientes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Lista de Clientes</h3>
                                <button
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => setShowModal(true)}
                                >
                                    Nuevo Cliente
                                </button>
                            </div>
                            <DataTable
                                columns={columns}
                                data={clients}
                                onRowClick={handleRowClick}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ClientModal
                show={showModal}
                onClose={() => setShowModal(false)}
            />
        </AuthenticatedLayout>
    );
}