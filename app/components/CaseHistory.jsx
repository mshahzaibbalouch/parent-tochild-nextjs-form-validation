import React from 'react';

const CaseHistory = ({ formData, handleChange, errors, fields }) => {
  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <label className="mb-2 font-medium text-gray-700">{field.label}:</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors[field.name] && (
            <div className="mt-2 text-sm text-red-500">{errors[field.name]}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CaseHistory;
