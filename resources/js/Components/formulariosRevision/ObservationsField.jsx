import React from 'react';

export default function ObservationsField({ formData, handleInputChange, visibleSections, toggleSection }) {
    return (
        <div className="mb-6">
            <div 
                className="flex items-center cursor-pointer bg-gray-100 p-2 rounded-t"
                onClick={() => toggleSection('observations')}
            >
                <h3 className="text-lg font-medium flex-grow">Observaciones</h3>
                <span>{visibleSections.observations ? '▼' : '▶'}</span>
            </div>
            {visibleSections.observations && (
                <div className="p-4 border border-gray-200 rounded-b">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                        <textarea 
                            name="observaciones"
                            value={formData.observaciones}
                            onChange={handleInputChange}
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                        ></textarea>
                    </div>
                </div>
            )}
        </div>
    );
}