import { useState } from 'react';
import axios from 'axios';
import { InvoiceTable, AddInvoice } from './components/Index';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [checkedItems, setCheckedItems] = useState([]);

  const getData = async () => {
    try {
      const gotData = await axios.get('http://localhost:3000/');
      setData(gotData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const approveInvoice = async () => {
    try {
      const updateInvoice = checkedItems.map(async (id) => {
        const invoiceToUpdate = {
          _id: id,
          status: 'approved',
        };

        const approve = await axios.put(
          'http://localhost:3000/',
          invoiceToUpdate
        );
        return approve.data;
      });
      const results = await Promise.all(updateInvoice);
      console.log('The following invoices were updated: ', results);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    getData();
    return <div>Loading...</div>;
  }

  return (
    <div className="table-wrapper">
      <div className="invoice-table-container">
        <InvoiceTable
          data={data}
          setCheckedItems={setCheckedItems}
          checkedItems={checkedItems}
        />
        <div className="btn-container">
          <button
            disabled={!checkedItems.length}
            onClick={() => approveInvoice()}
          >
            Approve Selected Invoices
          </button>
        </div>
      </div>
      <div className="add-invoice-container">
        <AddInvoice getData={getData} />
      </div>
    </div>
  );
}

export default App;
