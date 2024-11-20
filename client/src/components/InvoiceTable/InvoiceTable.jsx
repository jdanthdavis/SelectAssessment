import './InvoiceTable.css';

const InvoiceTable = ({ data, setCheckedItems, checkedItems }) => {
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
    <div className="table-container">
      <div className="header">
        <div />
        <div>Invoice Number</div>
        <div>Total</div>
        <div>Currency</div>
        <div>Invoice Date</div>
        <div>Due Date</div>
        <div>Vendor Name</div>
        <div>Remittance Address</div>
      </div>
      {data.map((data, index) => (
        <div
          className={`row ${index % 2 === 0 ? 'even' : 'odd'}`}
          key={data._id}
        >
          {data.status === 'pending' && (
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
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default InvoiceTable;
