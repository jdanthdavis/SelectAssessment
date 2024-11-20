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
  };

  /**
   * Adds an invoice and then calls getData() to refresh the table
   * @returns
   */
  const addInvoice = async () => {
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
            <div key={label} className="input-container">
              <label>{label}: </label>
              {/* //TODO: need validation for numeric inputs */}
              <input
                type={type}
                name={label}
                onChange={handleChange}
                value={newInvoiceData[label]}
              />
            </div>
          );
        })}
        <button
          onClick={addInvoice}
          disabled={!newInvoiceData.remittance_address}
        >
          Add Invoice
        </button>
      </div>
      <div />
    </div>
  );
};

export default AddInvoice;
