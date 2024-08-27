'use client';

import React, { useState } from 'react';
import CaseHistory from './CaseHistory';
import * as Yup from 'yup';
import { formsConfig } from '@/api/forms';

const ParentComponent = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});


  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Find the form that contains the field being updated
    const formConfig = formsConfig.find((form) =>
      form.fields.some((field) => field.name === name)
    );

    try {
      // Validate only the current field being updated
      await formConfig.validationSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    } catch (validationError) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: validationError.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedValidationSchema = formsConfig.reduce((acc, formConfig) => {
      return acc.concat(formConfig.validationSchema);
    }, Yup.object());

    try {
      // Validate the combined data for all forms
      await combinedValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      console.log('All forms are valid:', formData);
      // Handle form submission here
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-8 text-center">Case History Forms by Shahzaib</h1>
      {formsConfig.map((formConfig, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{`Form ${index + 1}`}</h2>
          <CaseHistory
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            fields={formConfig.fields}
          />
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="w-full py-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit All Forms
      </button>
    </div>
  );
};

export default ParentComponent;
