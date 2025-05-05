import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Inventario() {
  const [excelFiles, setExcelFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [error, setError] = useState('');
  const [minMaxLevels, setMinMaxLevels] = useState({});
  const [transactions, setTransactions] = useState([]);

  const handleExcelFileAdd = e => {
    const files = Array.from(e.target.files);
    setExcelFiles(prev => [...prev, ...files]);
    setFileNames(prev => [...prev, ...files.map(f => f.name)]);
  };

  const removeFile = index => {
    setExcelFiles(prev => prev.filter((_, i) => i !== index));
    setFileNames(prev => prev.filter((_, i) => i !== index));
  };

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
            const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
            if (rows.length < 2) return;
            
            const headers = rows[0].map(h => String(h).trim().toLowerCase());
            const idxModelo = headers.findIndex(h => /modelo|model/i.test(h));
            const idxCategoria = headers.findIndex(h => /categor/i.test(h));
            const idxNombre = headers.findIndex(h => /nombre|name/i.test(h));
            const idxSerial = headers.findIndex(h => /serial/i.test(h));
            const idxStock = headers.findIndex(h => /stock|cantidad|quantity/i.test(h));
            const idxLote = headers.findIndex(h => /lote|batch/i.test(h));
            const idxUbicacion = headers.findIndex(h => /ubicacion|location/i.test(h));
            const idxBarcode = headers.findIndex(h => /barcode|codigo/i.test(h));
            const idxMinStock = headers.findIndex(h => /min/i.test(h));
            const idxMaxStock = headers.findIndex(h => /max/i.test(h));

            rows.slice(1).forEach((r, i) => {
              const serial = idxSerial >= 0 ? r[idxSerial] : '';
              const stockLevel = idxStock >= 0 ? parseInt(r[idxStock], 10) || 0 : 0;
              
              result.push({
                archivo: file.name,
                hoja: sheetName,
                numero: i + 1,
                modelo: idxModelo >= 0 ? r[idxModelo] : '',
                categoria: idxCategoria >= 0 ? r[idxCategoria] : '',
                nombre: idxNombre >= 0 ? r[idxNombre] : '',
                serial: serial,
                stock_total: stockLevel,
                lote: idxLote >= 0 ? r[idxLote] : '',
                ubicacion: idxUbicacion >= 0 ? r[idxUbicacion] : '',
                barcode: idxBarcode >= 0 ? r[idxBarcode] : '',
                min_stock: idxMinStock >= 0 ? parseInt(r[idxMinStock], 10) || 0 : 0,
                max_stock: idxMaxStock >= 0 ? parseInt(r[idxMaxStock], 10) || 0 : 0
              });

              // Track min/max levels
              if (serial) {
                setMinMaxLevels(prev => ({
                  ...prev,
                  [serial]: {
                    min: idxMinStock >= 0 ? parseInt(r[idxMinStock], 10) || 0 : 0,
                    max: idxMaxStock >= 0 ? parseInt(r[idxMaxStock], 10) || 0 : 0
                  }
                }));
              }
            });
          });

          resolve(result);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleStockMovement = (serial, type, quantity) => {
    const newTransaction = {
      date: new Date().toISOString(),
      serial,
      type,
      quantity
    };
    setTransactions(prev => [...prev, newTransaction]);

    setMasterData(prev => prev.map(item => {
      if (item.serial === serial) {
        const newStock = type === 'entrada' 
          ? item.stock_total + quantity
          : item.stock_total - quantity;
        
        // Check stock levels
        const levels = minMaxLevels[serial];
        if (levels && newStock < levels.min) {
          setError(`Warning: Stock below minimum level for item ${serial}`);
        }
        if (levels && newStock > levels.max) {
          setError(`Warning: Stock above maximum level for item ${serial}`);
        }

        return {...item, stock_total: newStock};
      }
      return item;
    }));
  };

  const generateMasterTable = async () => {
    if (!excelFiles.length) {
      setError('No files to process.');
      return;
    }
    try {
      setError('');
      const all = await Promise.all(excelFiles.map(parseAndNormalize));
      setMasterData(all.flat());
    } catch (err) {
      console.error(err);
      setError('Error processing files: ' + err.message);
    }
  };

  const exportMasterTable = () => {
    if (!masterData.length) {
      setError('No data to export.');
      return;
    }
    const ws = XLSX.utils.json_to_sheet(masterData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    XLSX.writeFile(wb, 'inventory.xlsx');
  };

  return (
    <AuthenticatedLayout>
      <Head title="Inventory" />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Master Inventory</h1>

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
                  Remove
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
            Generate Master Table
          </button>
          <button
            onClick={exportMasterTable}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Export Excel
          </button>
        </div>

        {masterData.length > 0 && (
          <div className="overflow-x-auto border-t pt-4">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="bg-gray-100">
                  {['#','File','Sheet','Model','Category','Name','Serial','Stock','Batch','Location','Barcode','Min','Max'].map((h,idx) => (
                    <th key={idx} className="border px-2 py-1">{h}</th>
                  ))}
                  <th className="border px-2 py-1">Actions</th>
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
                    <td className="border px-2 py-1">{row.lote}</td>
                    <td className="border px-2 py-1">{row.ubicacion}</td>
                    <td className="border px-2 py-1">{row.barcode}</td>
                    <td className="border px-2 py-1">{row.min_stock}</td>
                    <td className="border px-2 py-1">{row.max_stock}</td>
                    <td className="border px-2 py-1">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStockMovement(row.serial, 'entrada', 1)}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleStockMovement(row.serial, 'salida', 1)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          -
                        </button>
                      </div>
                    </td>
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
