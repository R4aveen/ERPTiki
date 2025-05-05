import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { useState } from 'react';
import Form from '@/Components/ClientProvider/Form';

export default function ClientProvider({ relationships, clients, providers }) {
    const columns = [
        { key: 'client_name', label: 'Cliente' },
        { key: 'provider_name', label: 'Proveedor' },
        { key: 'fecha_inicio_relacion', label: 'Fecha de Inicio' },
        { key: 'contrato_id', label: 'ID Contrato' },
        { key: 'notas', label: 'Notas' },
        { key: 'created_at', label: 'Fecha de Registro' }
    ];

    const [showForm, setShowForm] = useState(false);

    const handleRowClick = (relationship) => {
        // TODO: Implement relationship details view
        console.log('Relationship clicked:', relationship);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Relaciones Cliente-Proveedor
                </h2>
            }
        >
            <Head title="Relaciones Cliente-Proveedor" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Lista de Relaciones</h3>
                                <button
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => setShowForm(true)}
                                >
                                    Nueva Relación
                                </button>
                            </div>
                            <DataTable
                                columns={columns}
                                data={relationships}
                                onRowClick={handleRowClick}
                            />
                            <Form
                                show={showForm}
                                onClose={() => setShowForm(false)}
                                clients={clients}
                                providers={providers}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}