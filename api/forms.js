import * as Yup from 'yup';

export const formsConfig = [
    {
      name: 'form1',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
      ],
      validationSchema: Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
      }),
    },
    {
      name: 'form2',
      fields: [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone Number', type: 'text' },
      ],
      validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().matches(/^\d{10}$/, 'Phone Number must be 10 digits').required('Phone Number is required'),
      }),
    },
    {
      name: 'form3',
      fields: [
        { name: 'dob', label: 'Date of Birth', type: 'date' },
        { name: 'caseDescription', label: 'Case Description', type: 'textarea' },
      ],
      validationSchema: Yup.object({
        dob: Yup.date().required('Date of Birth is required'),
        caseDescription: Yup.string().required('Case Description is required'),
      }),
    },
    {
        name: 'form4',
        fields: [
          { name: 'shahzaib', label: 'Shahzaib', type: 'text' },
          { name: 'ali', label: 'Ali', type: 'text' },
        ],
        validationSchema: Yup.object({
          shahzaib: Yup.string().required('Shahzaib is required'),
          ali: Yup.string().required('Ali is required'),
        }),
      },
  ];
