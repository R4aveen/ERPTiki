import React from 'react';

const createExcelSection = (title, fields) => ({
    title,
    columns: Object.keys(fields),
    fieldMapping: fields
});

const excelSections = [
    createExcelSection("Información General", {
        "Nº": "numero",
        "Marca": "marca",
        "Modelo": "modelo",
        "Serial Number": "serialNumber"
    }),
    createExcelSection("Pantalla", {
        "Pulgadas": "pulgadas",
        "Estado Pantalla": "estadoPantalla",
        "Tecnología": "tecnologia",
        "Resolución": "resolucion"
    }),
    createExcelSection("Conexión - Puertos", {
        "VGA": "vga",
        "HDMI": "hdmi",
        "Displayport": "displayport",
        "DVI": "dvi",
        "USB": "usb"
    }),
    createExcelSection("Alimentación", {
        "Incluye Cable": "incluyeCable",
        "Estado Cable": "estadoCable"
    }),
    createExcelSection("Carcasa", {
        "Estado Carcasa": "estadoCarcasa",
        "Base/Soporte": "baseSoporte",
        "Estado Base": "estadoBase"
    }),
    createExcelSection("Adicional", {
        "Observaciones": "observaciones",
        "CLIENTE": "cliente",
        "PROVEEDOR": "proveedor"
    })
];

// Default values for fields that might be missing
const defaultValues = {
    vga: "No",
    hdmi: "No",
    displayport: "No",
    dvi: "No",
    usb: "No",
    incluyeCable: "Sí",
    estadoCable: "Bueno",
    estadoPantalla: "Bueno",
    estadoCarcasa: "Bueno",
    baseSoporte: "Sí",
    estadoBase: "Bueno"
};

function MonitorForm({ formData, handleInputChange, visibleSections, toggleSection }) {
    return (
        <>
            {/* Sección de información general */}
            <div className="mb-6">
                <div 
                    className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                    onClick={() => toggleSection('general')}
                >
                    <h3 className="text-lg font-medium flex-grow">Información General</h3>
                    <span>{visibleSections.general ? '▼' : '▶'}</span>
                </div>
                {visibleSections.general && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-b">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Marca</label>
                            <input 
                                type="text" 
                                name="marca"
                                value={formData.marca || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Modelo</label>
                            <input 
                                type="text" 
                                name="modelo"
                                value={formData.modelo || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Serial Number</label>
                            <input 
                                type="text" 
                                name="serialNumber"
                                value={formData.serialNumber || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Sección de pantalla */}
            <div className="mb-6">
                <div 
                    className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                    onClick={() => toggleSection('screen')}
                >
                    <h3 className="text-lg font-medium flex-grow">Monitor</h3>
                    <span>{visibleSections.screen ? '▼' : '▶'}</span>
                </div>
                {visibleSections.screen && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-b">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pulgadas Pantalla</label>
                            <input 
                                type="text" 
                                name="pulgadasPantalla"
                                value={formData.pulgadasPantalla || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado Pantalla</label>
                            <select
                                name="estadoPantalla"
                                value={formData.estadoPantalla || 'Bueno'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Bueno">Bueno</option>
                                <option value="Regular">Regular</option>
                                <option value="Malo">Malo</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Alimentación</label>
                            <select
                                name="alimentacion"
                                value={formData.alimentacion || 'Incluye'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Incluye">Incluye</option>
                                <option value="No incluye">No incluye</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado del Cable</label>
                            <select
                                name="estadoCable"
                                value={formData.estadoCable || 'Bueno'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Bueno">Bueno</option>
                                <option value="Regular">Regular</option>
                                <option value="Malo">Malo</option>
                                <option value="No incluye">No incluye</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Sección de conexiones */}
            <div className="mb-6">
                <div 
                    className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                    onClick={() => toggleSection('ports')}
                >
                    <h3 className="text-lg font-medium flex-grow">Conexiones</h3>
                    <span>{visibleSections.ports ? '▼' : '▶'}</span>
                </div>
                {visibleSections.ports && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-b">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">VGA</label>
                            <select
                                name="vga"
                                value={formData.vga || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">HDMI</label>
                            <select
                                name="hdmi"
                                value={formData.hdmi || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">DisplayPort</label>
                            <select
                                name="displayport"
                                value={formData.displayport || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">USB</label>
                            <input 
                                type="text" 
                                name="usb"
                                value={formData.usb || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                placeholder="Cantidad de puertos USB"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
MonitorForm.excelSections = excelSections;
MonitorForm.defaultValues = defaultValues;

export default MonitorForm;