import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Inventario() {
  const [excelFiles, setExcelFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [error, setError] = useState('');

  const handleExcelFileAdd = e => {
    const files = Array.from(e.target.files);
    setExcelFiles(prev => [...prev, ...files]);
    setFileNames(prev => [...prev, ...files.map(f => f.name)]);
  };

  const removeFile = index => {
    setExcelFiles(prev => prev.filter((_, i) => i !== index));
    setFileNames(prev => prev.filter((_, i) => i !== index));
  };

  // Lee y normaliza solo las columnas que nos interesan
  const parseAndNormalize = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const result = [];

          workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            // Leemos todo como array de arrays
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
            if (rows.length < 2) return; // sin datos
            // Primera fila = encabezados
            const headers = rows[0].map(h => String(h).trim().toLowerCase());
            // Detectamos índices
            const idxModelo   = headers.findIndex(h => /modelo|model/i.test(h));
            const idxCategoria= headers.findIndex(h => /categor/i.test(h));
            const idxNombre   = headers.findIndex(h => /nombre|name/i.test(h));
            const idxSerial   = headers.findIndex(h => /serial/i.test(h));
            const idxStock    = headers.findIndex(h => /stock|cantidad|quantity/i.test(h));

            // Procesamos filas de datos
            rows.slice(1).forEach((r, i) => {
              result.push({
                archivo: file.name,
                hoja: sheetName,
                numero: i + 1,
                modelo: idxModelo   >= 0 ? r[idxModelo] : '',
                categoria: idxCategoria >= 0 ? r[idxCategoria] : '',
                nombre: idxNombre   >= 0 ? r[idxNombre] : '',
                serial: idxSerial   >= 0 ? r[idxSerial] : '',
                stock_total: idxStock >= 0 ? parseInt(r[idxStock], 10) || 0 : 0,
              });
            });
          });

          resolve(result);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Error leyendo el archivo'));
      reader.readAsArrayBuffer(file);
    });
  };

  const generateMasterTable = async () => {
    if (!excelFiles.length) {
      setError('No hay archivos para procesar.');
      return;
    }
    try {
      setError('');
      // Parseamos y normalizamos cada archivo
      const all = await Promise.all(excelFiles.map(parseAndNormalize));
      // Aplanamos
      setMasterData(all.flat());
    } catch (err) {
      console.error(err);
      setError('Error procesando archivos: ' + err.message);
    }
  };

  const exportMasterTable = () => {
    if (!masterData.length) {
      setError('No hay datos para exportar.');
      return;
    }
    const ws = XLSX.utils.json_to_sheet(masterData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventario');
    XLSX.writeFile(wb, 'inventario.xlsx');
  };

  return (
    <AuthenticatedLayout>
      <Head title="Inventario" />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Inventario Maestro</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <input
          type="file"
          multiple
          accept=".xlsx,.xls"
          onChange={handleExcelFileAdd}
          className="mb-4"
        />

        {fileNames.length > 0 && (
          <ul className="mb-4 list-disc pl-5">
            {fileNames.map((n, i) => (
              <li key={i} className="flex justify-between">
                {n}
                <button
                  onClick={() => removeFile(i)}
                  className="text-red-500 hover:underline"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex mb-6 gap-4">
          <button
            onClick={generateMasterTable}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Generar Tabla Maestra
          </button>
          <button
            onClick={exportMasterTable}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Exportar Excel
          </button>
        </div>

        {masterData.length > 0 && (
          <div className="overflow-x-auto border-t pt-4">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="bg-gray-100">
                  {['#','Archivo','Hoja','Modelo','Categoría','Nombre','Serial','Stock'].map((h,idx) => (
                    <th key={idx} className="border px-2 py-1">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {masterData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{row.numero}</td>
                    <td className="border px-2 py-1">{row.archivo}</td>
                    <td className="border px-2 py-1">{row.hoja}</td>
                    <td className="border px-2 py-1">{row.modelo}</td>
                    <td className="border px-2 py-1">{row.categoria}</td>
                    <td className="border px-2 py-1">{row.nombre}</td>
                    <td className="border px-2 py-1">{row.serial}</td>
                    <td className="border px-2 py-1">{row.stock_total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
