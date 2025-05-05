import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Form({ show, onClose, provider = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        nombre: provider?.nombre || '',
        direccion: provider?.direccion || '',
        telefono: provider?.telefono || '',
        email: provider?.email || ''
    });

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (provider) {
            put(route('providers.update', provider.id), {
                onSuccess: () => onClose()
            });
        } else {
            post(route('providers.store'), {
                onSuccess: () => onClose()
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {provider ? 'Editar' : 'Nuevo'} Proveedor
                </h2>

                <div className="mt-6">
                    <InputLabel htmlFor="nombre" value="Nombre" />
                    <TextInput
                        id="nombre"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.nombre}
                        onChange={e => setData('nombre', e.target.value)}
                        required
                    />
                    <InputError message={errors.nombre} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="direccion" value="Dirección" />
                    <TextInput
                        id="direccion"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.direccion}
                        onChange={e => setData('direccion', e.target.value)}
                        required
                    />
                    <InputError message={errors.direccion} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="telefono" value="Teléfono" />
                    <TextInput
                        id="telefono"
                        type="tel"
                        className="mt-1 block w-full"
                        value={data.telefono}
                        onChange={e => setData('telefono', e.target.value)}
                        required
                    />
                    <InputError message={errors.telefono} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}