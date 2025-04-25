import React from 'react';

export default function CommonFields({ 
    formData, 
    handleInputChange, 
    visibleSections, 
    toggleSection,
    clientName,
    handleClientChange,
    showClientInput,
    newClientName,
    setNewClientName,
    confirmNewClient,
    showNewProviderForm,
    providerName,
    setProviderName,
    handleProviderChange,
    confirmNewProvider
}) {
    return (
        <>
            {/* Sección de fechas */}
            <div className="mb-6">
                <div 
                    className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                    onClick={() => toggleSection('dates')}
                >
                    <h3 className="text-lg font-medium flex-grow">Fechas</h3>
                    <span>{visibleSections.dates ? '▼' : '▶'}</span>
                </div>
                {visibleSections.dates && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-b">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha Recepción</label>
                            <input 
                                type="date" 
                                name="fechaRecepcion"
                                value={formData.fechaRecepcion}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fecha Revisión</label>
                            <input 
                                type="date" 
                                name="fechaRevision"
                                value={formData.fechaRevision}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Sección de cliente/proveedor */}
            <div className="mb-6">
                <div 
                    className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                    onClick={() => toggleSection('clientProvider')}
                >
                    <h3 className="text-lg font-medium flex-grow">Cliente y Proveedor</h3>
                    <span>{visibleSections.clientProvider ? '▼' : '▶'}</span>
                </div>
                {visibleSections.clientProvider && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-b">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cliente</label>
                            {!showClientInput ? (
                                <select 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={clientName}
                                    onChange={handleClientChange}
                                >
                                    <option value="H. DE ANTOFAGASTA">H. DE ANTOFAGASTA</option>
                                    <option value="Hospital Regional">Hospital Regional</option>
                                    <option value="Clínica Antofagasta">Clínica Antofagasta</option>
                                    <option value="new">Agregar nuevo cliente...</option>
                                </select>
                            ) : (
                                <div className="flex items-center mt-1">
                                    <input 
                                        type="text" 
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-2"
                                        placeholder="Nombre del cliente"
                                        value={newClientName}
                                        onChange={(e) => setNewClientName(e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                                        onClick={confirmNewClient}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Proveedor</label>
                            {!showNewProviderForm ? (
                                <select 
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={formData.proveedor}
                                    onChange={handleProviderChange}
                                >
                                    <option value="">Seleccionar proveedor</option>
                                    <option value="Proveedor 1">Proveedor 1</option>
                                    <option value="Proveedor 2">Proveedor 2</option>
                                    <option value="new">Agregar nuevo proveedor...</option>
                                </select>
                            ) : (
                                <div className="flex items-center mt-1">
                                    <input 
                                        type="text" 
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-2"
                                        placeholder="Nombre del proveedor"
                                        value={providerName}
                                        onChange={(e) => setProviderName(e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                                        onClick={confirmNewProvider}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}