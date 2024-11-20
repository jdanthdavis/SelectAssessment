import { useState } from 'react';
import axios from 'axios';
import './AddInvoice.css';

const inputs = {
  invoice_number: 'number',
  total: 'number',
  currency: 'number',
  invoice_date: 'date',
  due_date: 'date',
  vendor_name: 'text',
  remittance_address: 'text',
};

/**
 * A component that renders an input field to insert new invoices
 * @returns
 */
const AddInvoice = ({ getData }) => {
  const [errors, setErrors] = useState({});
  const [newInvoiceData, setNewInvoiceData] = useState({
    invoice_number: '',
    total: '',
    currency: '',
    invoice_date: '',
    due_date: '',
    vendor_name: '',
    remittance_address: '',
  });

  /**
   * Updates the corresponding input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInvoiceData({
      ...newInvoiceData,
      [name]: value,
    });

    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const isNumeric = (fieldName, fieldValue, errorMessages) => {
    if (!/^\d+$/.test(fieldValue)) {
      errorMessages[fieldName] = 'Numeric inputs only';
    }
  };

  const hasValue = (fieldName, fieldValue, errorMessages) => {
    if (!fieldValue) {
      errorMessages[fieldName] = 'Required';
    }
  };

  const validateInputs = () => {
    let errorMessages = { ...errors };

    isNumeric('invoice_number', newInvoiceData.invoice_number, errorMessages);
    isNumeric('total', newInvoiceData.total, errorMessages);
    isNumeric('currency', newInvoiceData.currency, errorMessages);

    hasValue('invoice_date', newInvoiceData.invoice_date, errorMessages);
    hasValue('due_date', newInvoiceData.due_date, errorMessages);
    hasValue('vendor_name', newInvoiceData.vendor_name, errorMessages);
    hasValue(
      'remittance_address',
      newInvoiceData.remittance_address,
      errorMessages
    );

    setErrors(errorMessages);
    return (
      Object.values(errorMessages).includes('Required') ||
      Object.values(errorMessages).includes('Numeric inputs only')
    );
  };

  /**
   * Adds an invoice and then calls getData() to refresh the table
   * @returns
   */
  const addInvoice = async () => {
    if (validateInputs()) return;

    try {
      const response = await axios.post(
        'http://localhost:3000/',
        newInvoiceData
      );
      console.log('Invoice created:', response.data);

      // clearing the input states
      setNewInvoiceData({
        invoice_number: '',
        total: '',
        currency: '',
        invoice_date: '',
        due_date: '',
        vendor_name: '',
        remittance_address: '',
      });

      // gets all the invoices in the db again
      getData();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div className="add-invoice-wrapper">
      <div className="add-invoice-container">
        <div>
          <p>
            Allows for adding invoices to the invoice db <br />
            (status defaults to pending)
          </p>
        </div>
        {Object.entries(inputs).map(([label, type]) => {
          return (
            <>
              <div key={label} className="input-container">
                <label>{label}: </label>
                <input
                  className={`${label} input ${errors[label] ? 'error' : ''}`}
                  type={type}
                  name={label}
                  onChange={handleChange}
                  onBlur={handleChange}
                  value={newInvoiceData[label]}
                  placeholder={errors[label]}
                />
              </div>
            </>
          );
        })}
        <button onClick={addInvoice}>Add Invoice</button>
      </div>
      <div />
    </div>
  );
};

export default AddInvoice;