import React from 'react';

// Excel export configuration
// Dynamic configuration for Excel sections and form fields
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
        "Serial Number": "serialNumber",
        "Procesador": "procesador"
    }),
    createExcelSection("Memoria y Almacenamiento", {
        "RAM": "ram",
        "Slot Ram": "slotRam",
        "Tipo RAM": "tipoRam",
        "HDD": "hdd",
        "Tec. HDD": "tecHdd"
    }),
    createExcelSection("Pantalla", {
        "Pulgadas Pant.": "pulgadasPantalla",
        "Estado Pantalla": "estadoPantalla",
        "Tactil": "tactil"
    }),
    createExcelSection("Conexión - Puertos", {
        "VGA": "vga",
        "HDMI": "hdmi",
        "Displayport": "displayport",
        "USB": "usb",
        "USB Tipo C": "usbTipoC",
        "SD": "sd",
        "RJ-45": "rj45",
        "WiFi": "wifi",
        "Bluetooth": "bluetooth"
    }),
    createExcelSection("Unidades Ópticas", {
        "Lector CD/DVD": "lectorCd"
    }),
    createExcelSection("Periféricos", {
        "Estado Teclado": "estadoTeclado",
        "Estado Mouse": "estadoMouse"
    }),
    createExcelSection("Adicional", {
        "Observaciones": "observaciones",
        "CATEGORIA": "categoria",
        "S.O": "so",
        "CLIENTE": "cliente",
        "PROVEEDOR": "proveedor"
    })
];

// Default values for fields that might be missing
const defaultValues = {
    vga: "No",
    hdmi: "No",
    displayport: "No",
    usb: "No",
    usbTipoC: "No",
    sd: "No",
    wifi: "No",
    rj45: "No",
    bluetooth: "No",
    lectorCd: "No",
    tactil: "No",
    estadoTeclado: "Bueno",
    estadoMouse: "Bueno",
    estadoPantalla: "Bueno"
};

function AIOForm({ formData, handleInputChange, visibleSections, toggleSection }) {
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
                            <label className="block text-sm font-medium text-gray-700">Línea</label>
                            <input 
                                type="text" 
                                name="linea"
                                value={formData.linea || ''}
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Procesador</label>
                            <input 
                                type="text" 
                                name="procesador"
                                value={formData.procesador || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Sección de memoria */}
            <div className="mb-6">
                <div 
                    className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                    onClick={() => toggleSection('memory')}
                >
                    <h3 className="text-lg font-medium flex-grow">Memoria</h3>
                    <span>{visibleSections.memory ? '▼' : '▶'}</span>
                </div>
                {visibleSections.memory && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-b">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">RAM</label>
                            <input 
                                type="text" 
                                name="ram"
                                value={formData.ram || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Slots RAM</label>
                            <input 
                                type="text" 
                                name="slotRam"
                                value={formData.slotRam || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo RAM</label>
                            <input 
                                type="text" 
                                name="tipoRam"
                                value={formData.tipoRam || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">HDD</label>
                            <input 
                                type="text" 
                                name="hdd"
                                value={formData.hdd || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tecnología HDD</label>
                            <input 
                                type="text" 
                                name="tecHdd"
                                value={formData.tecHdd || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Sección de cargador */}
            <div className="mb-6">
                <div 
                    className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                    onClick={() => toggleSection('charger')}
                >
                    <h3 className="text-lg font-medium flex-grow">Cargador</h3>
                    <span>{visibleSections.charger ? '▼' : '▶'}</span>
                </div>
                {visibleSections.charger && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-b">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Incluye Cargador</label>
                            <select
                                name="incluyeCargador"
                                value={formData.incluyeCargador || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado Cargador</label>
                            <select
                                name="estadoCargador"
                                value={formData.estadoCargador || 'Bueno'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Bueno">Bueno</option>
                                <option value="Regular">Regular</option>
                                <option value="Malo">Malo</option>
                                <option value="No aplica">No aplica</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Sección de puertos */}
            <div className="mb-6">
                <div 
                    className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                    onClick={() => toggleSection('ports')}
                >
                    <h3 className="text-lg font-medium flex-grow">Conexión - Puertos</h3>
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700">USB Tipo C</label>
                            <select
                                name="usbTipoC"
                                value={formData.usbTipoC || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">SD</label>
                            <select
                                name="sd"
                                value={formData.sd || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">WiFi</label>
                            <select
                                name="wifi"
                                value={formData.wifi || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">RJ-45</label>
                            <select
                                name="rj45"
                                value={formData.rj45 || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bluetooth</label>
                            <select
                                name="bluetooth"
                                value={formData.bluetooth || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
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
                    <h3 className="text-lg font-medium flex-grow">Pantalla</h3>
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
                            <label className="block text-sm font-medium text-gray-700">Estado Cubierta</label>
                            <select
                                name="estadoCubierta"
                                value={formData.estadoCubierta || 'Bueno'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Bueno">Bueno</option>
                                <option value="Regular">Regular</option>
                                <option value="Malo">Malo</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Sección de periféricos y otros */}
            <div className="mb-6">
                <div 
                    className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                    onClick={() => toggleSection('peripherals')}
                >
                    <h3 className="text-lg font-medium flex-grow">Carcasa - Periféricos - Otros</h3>
                    <span>{visibleSections.peripherals ? '▼' : '▶'}</span>
                </div>
                {visibleSections.peripherals && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-b">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Lector CD</label>
                            <select
                                name="lectorCd"
                                value={formData.lectorCd || 'Sí'}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="Sí">Sí</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Otros</label>
                            <input 
                                type="text" 
                                name="otros"
                                value={formData.otros || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                placeholder="Otros periféricos o características"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

AIOForm.excelSections = excelSections;
excelSections;
AIOForm.defaultValues = defaultValues;

export default AIOForm;