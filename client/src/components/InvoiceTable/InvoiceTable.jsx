import { useState } from 'react';
import { sort } from '../../helperFunctions/sort';
import './InvoiceTable.css';

const headers = {
  'Invoice Number': 'invoice_number',
  'Invoice Total': 'total',
  Currency: 'currency',
  'Invoice Date': 'invoice_date',
  'Due Date': 'due_date',
  'Vendor Name': 'vendor_name',
  'Vendor Address': 'remittance_address',
};

/**
 * Displays all the invoice records
 * @param {*} param0
 * @returns
 */
const InvoiceTable = ({
  data,
  setData,
  setCheckedItems,
  checkedItems,
  showStatus,
}) => {
  const [sorted, setSorted] = useState();

  /**
   * Spreads the previous data and adds any new checked invoices
   * @param {*} invoiceNumber
   */
  const handleCheckboxChange = (invoiceNumber) => {
    setCheckedItems((prev) => {
      if (prev.includes(invoiceNumber)) {
        return prev.filter((item) => item !== invoiceNumber);
      } else {
        return [...prev, invoiceNumber];
      }
    });
  };

  return (
    <div className={`table-container ${showStatus ? 'status' : ''}`}>
      <div className="header">
        <div />
        {Object.entries(headers).map(([label, key]) => {
          return (
            <div className="header-cell" key={key}>
              {label}
              <button
                className="sort-btn"
                key={key}
                id={key}
                disabled={sorted === 1}
                onClick={(e) => sort(1, data, setData, setSorted, e.target.id)}
              >
                &#x25b4;
              </button>
              <button
                className="sort-btn"
                key={key}
                id={key}
                disabled={sorted === -1}
                onClick={(e) => sort(-1, data, setData, setSorted, e.target.id)}
              >
                &#x25be;
              </button>
            </div>
          );
        })}
        {showStatus && (
          <div className="header-cell">
            <>
              Status
              <button
                className="sort-btn"
                disabled={sorted === 1}
                onClick={(e) => sort(1, data, setData, setSorted, e.target.id)}
              >
                &#x25b4;
              </button>
              <button
                className="sort-btn"
                disabled={sorted === -1}
                onClick={(e) => sort(-1, data, setData, setSorted, e.target.id)}
              >
                &#x25be;
              </button>
            </>
          </div>
        )}
      </div>
      {data.map(
        (data, index) =>
          (data.status === 'pending' || showStatus) && (
            <div
              className={`row ${index % 2 === 0 ? 'even' : 'odd'}`}
              key={data._id}
            >
              <>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(data._id)}
                    onChange={() => handleCheckboxChange(data._id)}
                  />
                </div>
                <div>{data.invoice_number}</div>
                <div>{data.total}</div>
                <div>{data.currency}</div>
                <div>{data.invoice_date.split('T')[0]}</div>
                <div>{data.due_date.split('T')[0]}</div>
                <div>{data.vendor_name}</div>
                <div>{data.remittance_address}</div>
                {showStatus && <div>{data.status}</div>}
              </>
            </div>
          )
      )}
    </div>
  );
};

export default InvoiceTable;
