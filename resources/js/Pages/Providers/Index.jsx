import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { useState } from 'react';
import Form from '@/Components/Provider/Form';

export default function Providers({ providers }) {
    const [showForm, setShowForm] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const columns = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'direccion', label: 'Dirección' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'email', label: 'Email' },
        { key: 'created_at', label: 'Fecha de Registro' }
    ];

    const handleRowClick = (provider) => {
        setSelectedProvider(provider);
        setShowForm(true);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Proveedores
                </h2>
            }
        >
            <Head title="Proveedores" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-lg font-medium">Lista de Proveedores</h3>
                                <button
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => {
                                        setSelectedProvider(null);
                                        setShowForm(true);
                                    }}
                                >
                                    Nuevo Proveedor
                                </button>
                            </div>
                            <DataTable
                                columns={columns}
                                data={providers}
                                onRowClick={handleRowClick}
                            />
                            <Form
                                show={showForm}
                                onClose={() => {
                                    setShowForm(false);
                                    setSelectedProvider(null);
                                }}
                                provider={selectedProvider}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}