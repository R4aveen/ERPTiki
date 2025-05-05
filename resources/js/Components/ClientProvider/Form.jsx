import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Form({ show, onClose, clients, providers, relationship = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        client_id: relationship?.client_id || '',
        provider_id: relationship?.provider_id || '',
        fecha_inicio_relacion: relationship?.fecha_inicio_relacion || '',
        contrato_id: relationship?.contrato_id || '',
        notas: relationship?.notas || ''
    });

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (relationship) {
            put(route('client-provider.update', relationship.id), {
                onSuccess: () => onClose()
            });
        } else {
            post(route('client-provider.store'), {
                onSuccess: () => onClose()
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {relationship ? 'Editar' : 'Nueva'} Relación Cliente-Proveedor
                </h2>

                <div className="mt-6">
                    <InputLabel htmlFor="client_id" value="Cliente" />
                    <select
                        id="client_id"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.client_id}
                        onChange={e => setData('client_id', e.target.value)}
                    >
                        <option value="">Seleccione un cliente</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.nombre}</option>
                        ))}
                    </select>
                    <InputError message={errors.client_id} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="provider_id" value="Proveedor" />
                    <select
                        id="provider_id"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.provider_id}
                        onChange={e => setData('provider_id', e.target.value)}
                    >
                        <option value="">Seleccione un proveedor</option>
                        {providers.map(provider => (
                            <option key={provider.id} value={provider.id}>{provider.nombre}</option>
                        ))}
                    </select>
                    <InputError message={errors.provider_id} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="fecha_inicio_relacion" value="Fecha de Inicio" />
                    <TextInput
                        id="fecha_inicio_relacion"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.fecha_inicio_relacion}
                        onChange={e => setData('fecha_inicio_relacion', e.target.value)}
                    />
                    <InputError message={errors.fecha_inicio_relacion} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="contrato_id" value="ID Contrato" />
                    <TextInput
                        id="contrato_id"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.contrato_id}
                        onChange={e => setData('contrato_id', e.target.value)}
                    />
                    <InputError message={errors.contrato_id} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="notas" value="Notas" />
                    <textarea
                        id="notas"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.notas}
                        onChange={e => setData('notas', e.target.value)}
                        rows="3"
                    />
                    <InputError message={errors.notas} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}