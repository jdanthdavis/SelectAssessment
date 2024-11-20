import { useState } from 'react';
import axios from 'axios';
import { InvoiceTable, AddInvoice } from './components/Index';
import PulseLoader from 'react-spinners/PulseLoader';
import BounceLoader from 'react-spinners/BounceLoader';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showStatus, setShowStatus] = useState(false);

  /**
   * Fetches all the invoice records
   */
  const getData = async () => {
    try {
      const gotData = await axios.get(
        'https://select-assessment-4ddb2ccc56ef.herokuapp.com/'
      );
      setData(gotData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  /**
   * Approves the selected invoice(s)
   */
  const approveInvoice = async () => {
    setBtnLoading(true);
    try {
      const updateInvoice = checkedItems.map(async (id) => {
        const invoiceToUpdate = {
          _id: id,
          status: 'approved',
        };

        const approve = await axios.put(
          'https://select-assessment-4ddb2ccc56ef.herokuapp.com/',
          invoiceToUpdate
        );
        return approve.data;
      });
      const results = await Promise.all(updateInvoice);
      console.log('The following invoices were updated: ', results);
      setCheckedItems([]);
      getData();
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    getData();
    return (
      <div className="loading-container">
        <BounceLoader
          color={'white'}
          loading
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="invoice-table-container">
        <InvoiceTable
          data={data}
          setData={setData}
          setCheckedItems={setCheckedItems}
          checkedItems={checkedItems}
          showStatus={showStatus}
        />
        <div className="btn-container">
          <button
            disabled={!checkedItems.length || showStatus}
            onClick={() => approveInvoice()}
          >
            {btnLoading ? (
              <PulseLoader
                color={'white'}
                loading={btnLoading}
                size={8}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              'Approve Selected Invoices'
            )}
          </button>
          &nbsp;
          <button onClick={() => setShowStatus(!showStatus ? true : false)}>
            {!showStatus ? 'View' : 'Hide'} All Invoice Statuses
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
