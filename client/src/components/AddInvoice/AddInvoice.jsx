import { useState } from 'react';
import axios from 'axios';
import IncButton from '../IncButton/IncButton';
import './AddInvoice.css';

const inputs = {
  invoice_number: 'text',
  currency: 'text',
  total: 'text',
  invoice_date: 'date',
  due_date: 'date',
  vendor_name: 'text',
  remittance_address: 'text',
};

/**
 * A component that renders an input field to insert new invoices
 * @param {*} param0
 * @returns
 */
const AddInvoice = ({ getData }) => {
  const [errors, setErrors] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [newInvoiceData, setNewInvoiceData] = useState({
    invoice_number: '',
    total: '',
    currency: 'USD',
    invoice_date: '',
    due_date: '',
    vendor_name: '',
    remittance_address: '',
  });

  /**
   * Format USD currency
   * @param {*} value
   * @param {*} currency
   * @returns
   */
  const formatToCurrency = (value, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(value);
  };

  /**
   * Updates the corresponding input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === 'total' && !/^\d+$/.test(value)) ||
      (name === 'invoice_number' && !/^\d+$/.test(value))
    ) {
      return;
    }

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

  /**
   * Handles onBlur for the total field
   */
  const handleBlur = () => {
    if (newInvoiceData.total && newInvoiceData.currency === 'USD') {
      const formattedValue = formatToCurrency(
        parseFloat(newInvoiceData.total.replace(/[^0-9.-]+/g, '')), // Remove non-numeric characters
        newInvoiceData.currency
      );
      setNewInvoiceData({
        ...newInvoiceData,
        total: formattedValue,
      });
    }
  };

  /**
   * checks if the input has a value
   * @param {*} fieldName
   * @param {*} fieldValue
   * @param {*} errorMessages
   */
  const hasValue = (fieldName, fieldValue, errorMessages) => {
    if (!fieldValue) {
      errorMessages[fieldName] = 'Required';
    }
  };

  /**
   * Validates all the input fields
   * @returns
   */
  const validateInputs = () => {
    let errorMessages = { ...errors };

    hasValue('total', newInvoiceData.total, errorMessages);
    hasValue('currency', newInvoiceData.currency, errorMessages);
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
    setBtnLoading(true);

    try {
      const response = await axios.post(
        'https://select-assessment-4ddb2ccc56ef.herokuapp.com/',
        newInvoiceData
      );
      console.log('Invoice created:', response.data);

      // clearing the input states
      setNewInvoiceData({
        invoice_number: '',
        total: '',
        currency: 'USD',
        invoice_date: '',
        due_date: '',
        vendor_name: '',
        remittance_address: '',
      });

      // gets all the invoices in the db again
      getData();
      setBtnLoading(false);
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
                  onBlur={label === 'total' && handleBlur}
                  value={newInvoiceData[label]}
                  placeholder={errors[label]}
                />
              </div>
            </>
          );
        })}
        <IncButton
          text={'Add Invoice'}
          onClick={addInvoice}
          loading={btnLoading}
        />
      </div>
      <div />
    </div>
  );
};

export default AddInvoice;
