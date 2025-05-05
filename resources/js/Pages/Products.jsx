import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

import NotebookForm from '@/Components/formulariosRevision/NotebookForm';
import DesktopForm from '@/Components/formulariosRevision/DesktopForm';
import CommonFields from '@/Components/formulariosRevision/CommonFields';
import ObservationsField from '@/Components/formulariosRevision/ObservationsField';
import AIOForm from '@/Components/formulariosRevision/AIOForm';
import MonitorForm from '@/Components/formulariosRevision/MonitorForm';

export default function Products() {
    const [equipmentType, setEquipmentType] = useState('notebook');
    
    const [showNewProviderForm, setShowNewProviderForm] = useState(false);
    const [providerName, setProviderName] = useState('');
    const [clientName, setClientName] = useState('H. DE ANTOFAGASTA');
    const [showClientInput, setShowClientInput] = useState(false);
    const [newClientName, setNewClientName] = useState('');
    const [providers, setProviders] = useState([]);
    const [clients, setClients] = useState([]);
    
    useEffect(() => {
        // Fetch providers from the backend
        fetch('/api/providers')
            .then(response => response.json())
            .then(data => setProviders(data))
            .catch(error => console.error('Error fetching providers:', error));

        // Fetch clients from the backend
        fetch('/api/clients')
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);
    
    const [visibleSections, setVisibleSections] = useState({
        dates: true,
        clientProvider: true,
        general: true,
        memory: true,
        charger: true,
        ports: true,
        screen: true,
        optical: true,
        observations: true
    });
    
    const [formData, setFormData] = useState({
        fechaRecepcion: '',
        fechaRevision: '',
        numero: '',
        cliente_id: '',
        provider_id: '',
        tipoEquipo: 'notebook',
        marca: '',
        modelo: '',
        serialNumber: '',
        estado: 'bueno',
        observaciones: '',
    });
    
    const [tableData, setTableData] = useState([]);

    const toggleSection = (section) => {
        setVisibleSections({
            ...visibleSections,
            [section]: !visibleSections[section]
        });
    };

    const handleProviderChange = (e) => {
        if (e.target.value === 'new') {
            setShowNewProviderForm(true);
        } else {
            setShowNewProviderForm(false);
            setFormData({...formData, proveedor: e.target.value});
        }
    };

    const confirmNewProvider = () => {
        alert(`¿Estás seguro de crear el nuevo proveedor: ${providerName}?`);
        setFormData({...formData, proveedor: providerName});
        setShowNewProviderForm(false);
    };

    const handleClientChange = (e) => {
        if (e.target.value === 'new') {
            setShowClientInput(true);
        } else {
            const selectedClient = clients.find(client => client.id === parseInt(e.target.value));
            setClientName(selectedClient.nombre);
            setFormData({...formData, cliente_id: selectedClient.id});
            setShowClientInput(false);
        }
    };

    const confirmNewClient = () => {
        setClientName(newClientName);
        setFormData({...formData, cliente: newClientName});
        setShowClientInput(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEquipmentTypeChange = (type) => {
        setEquipmentType(type);
        setFormData({
            ...formData,
            tipoEquipo: type
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const newProduct = await response.json();
            
            setTableData([...tableData, {
                ...formData,
                numero: (tableData.length + 1).toString(),
                id: newProduct.id
            }]);
            
            setFormData({
                ...formData,
                marca: '',
                modelo: '',
                serialNumber: '',
                observaciones: '',
            });
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error al guardar el producto');
        }
    };

    const exportToExcel = () => {
        const notebookData = tableData.filter(item => item.tipoEquipo === 'notebook');
        const desktopData = tableData.filter(item => item.tipoEquipo === 'desktop');
        const aioData = tableData.filter(item => item.tipoEquipo === 'aio');
        const monitorData = tableData.filter(item => item.tipoEquipo === 'monitor');
        
        const workbook = XLSX.utils.book_new();
        
        const createFormattedSheet = (data, sheetName, formComponent) => {
            const sections = formComponent.excelSections || [];
            
            if (sections.length === 0) {
                console.error(`No Excel sections defined for ${sheetName}`);
                return;
            }
            
            const ws = XLSX.utils.aoa_to_sheet([]);
            
            const headerRow = [];
            const columnHeaders = [];
            ws['!merges'] = ws['!merges'] || [];
            
            let currentCol = 0;
            sections.forEach(section => {
                headerRow.push(section.title);
                
                for (let i = 1; i < section.columns.length; i++) {
                    headerRow.push("");
                }
                
                ws['!merges'].push({ 
                    s: { r: 0, c: currentCol }, 
                    e: { r: 0, c: currentCol + section.columns.length - 1 } 
                });
                
                section.columns.forEach(col => {
                    columnHeaders.push(col);
                });
                
                currentCol += section.columns.length;
            });
            XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: 'A1' });
            XLSX.utils.sheet_add_aoa(ws, [columnHeaders], { origin: 'A2' });
            
            if (data.length > 0) {
                const dataRows = [];
                
                data.forEach(item => {
                    const row = [];
                    
                    sections.forEach(section => {
                        section.columns.forEach(col => {
                            const fieldName = section.fieldMapping[col];
                            
                            let value = '';
                            
                            if (item[fieldName] !== undefined) {
                                value = item[fieldName];
                            } 
                            else if (typeof item[fieldName] === 'boolean') {
                                value = item[fieldName] ? 'Sí' : 'No';
                            }
                            else if (formComponent.defaultValues && 
                                    formComponent.defaultValues[fieldName] !== undefined) {
                                value = formComponent.defaultValues[fieldName];
                            }
                            
                            row.push(value);
                        });
                    });
                    
                    dataRows.push(row);
                });
                
                XLSX.utils.sheet_add_aoa(ws, dataRows, { origin: 'A3' });
            }
            
            XLSX.utils.book_append_sheet(workbook, ws, sheetName);
        };
        
        if (notebookData.length > 0) {
            createFormattedSheet(notebookData, "Notebooks", NotebookForm);
        }
        
        if (desktopData.length > 0) {
            createFormattedSheet(desktopData, "Desktops", DesktopForm);
        }
        
        if (aioData.length > 0) {
            createFormattedSheet(aioData, "AIOs", AIOForm);
        }
        
        if (monitorData.length > 0) {
            createFormattedSheet(monitorData, "Monitores", MonitorForm);
        }
        
        const allSections = [
            {
                title: "Todos los Equipos",
                columns: ["Nº", "Marca", "Modelo", "Serial Number", "Tipo Equipo", "Observaciones", "Cliente", "Proveedor"],
                fieldMapping: {
                    "Nº": "numero",
                    "Marca": "marca",
                    "Modelo": "modelo",
                    "Serial Number": "serialNumber",
                    "Tipo Equipo": "tipoEquipo",
                    "Observaciones": "observaciones",
                    "Cliente": "cliente",
                    "Proveedor": "proveedor"
                }
            }
        ];
        
        const AllEquipmentForm = {
            excelSections: allSections,
            defaultValues: {
            }
        };
        
        createFormattedSheet(tableData, "Todos los Equipos", AllEquipmentForm);
        
        const filename = "REVISION ECOPC 2025.xlsx";
        
        XLSX.writeFile(workbook, filename);
    };

    const equipmentTypes = [
        { id: 'notebook', label: 'Notebook' },
        { id: 'desktop', label: 'Desktop' },
        { id: 'aio', label: 'AIO' },
        { id: 'monitor', label: 'Monitor' },
    ];

    const renderEquipmentForm = () => {
        switch (equipmentType) {
            case 'notebook':
                return <NotebookForm 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    visibleSections={visibleSections} 
                    toggleSection={toggleSection} 
                />;
            case 'desktop':
                return <DesktopForm 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    visibleSections={visibleSections} 
                    toggleSection={toggleSection} 
                />;
            case 'aio':
                return <AIOForm 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    visibleSections={visibleSections} 
                    toggleSection={toggleSection} 
                />;
            case 'monitor':
                return <MonitorForm 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    visibleSections={visibleSections} 
                    toggleSection={toggleSection} 
                />;
            default:
                return <p>Seleccione un tipo de equipo válido</p>;
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Revisión de Equipos
                </h2>
            }
        >
            <Head title="Revisión de Equipos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <h1 className="text-2xl font-bold mr-4">Revisión de Equipos</h1>
                                    <span className="text-gray-500">Cliente: {clientName}</span>
                                </div>
                                <button
                                    onClick={exportToExcel}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Exportar a Excel
                                </button>
                            </div>

                            <div className="mb-6 border-b border-gray-200">
                                <ul className="flex flex-wrap -mb-px">
                                    {equipmentTypes.map((type) => (
                                        <li key={type.id} className="mr-2">
                                            <button
                                                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                                    equipmentType === type.id
                                                        ? 'border-indigo-600 text-indigo-600'
                                                        : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                                                }`}
                                                onClick={() => handleEquipmentTypeChange(type.id)}
                                            >
                                                {type.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <CommonFields 
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    visibleSections={visibleSections}
                                    toggleSection={toggleSection}
                                    clientName={clientName}
                                    handleClientChange={handleClientChange}
                                    showClientInput={showClientInput}
                                    newClientName={newClientName}
                                    setNewClientName={setNewClientName}
                                    confirmNewClient={confirmNewClient}
                                    showNewProviderForm={showNewProviderForm}
                                    providerName={providerName}
                                    setProviderName={setProviderName}
                                    handleProviderChange={handleProviderChange}
                                    confirmNewProvider={confirmNewProvider}
                                    providers={providers}
                                    clients={clients}

                                />

                                {renderEquipmentForm()}

                                <ObservationsField 
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    visibleSections={visibleSections}
                                    toggleSection={toggleSection}
                                />

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Guardar Equipo
                                    </button>
                                </div>
                            </form>

                            {tableData.length > 0 && (
                                <div className="mt-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Equipos Registrados</h2>
                                        <button
                                            onClick={() => setTableData([])}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                        >
                                            Limpiar Tabla
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {tableData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">{item.numero}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{item.marca}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{item.modelo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{item.serialNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">{item.tipoEquipo}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <button
                                                                onClick={() => {
                                                                    const newTableData = tableData.filter((_, i) => i !== index);
                                                                    const updatedTableData = newTableData.map((item, idx) => ({
                                                                        ...item,
                                                                        numero: (idx + 1).toString()
                                                                    }));
                                                                    setTableData(updatedTableData);
                                                                }}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}