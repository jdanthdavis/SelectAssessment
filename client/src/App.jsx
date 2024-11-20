import { useEffect, useState } from 'react';
import axios from 'axios';
import { InvoiceTable, AddInvoice } from './components/Index';
import BounceLoader from 'react-spinners/BounceLoader';
import IncButton from './components/IncButton/IncButton';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showStatus, setShowStatus] = useState(false);

  /**
   * Fetches records
   */
  const getData = async (fetch = '/') => {
    try {
      const gotData = await axios.get(
        `https://select-assessment-4ddb2ccc56ef.herokuapp.com/${fetch}`
      );
      setData(gotData.data);
      setLoading(false);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  /**
   * Deletes the selected invoice(s)
   */
  const deleteInvoice = async () => {
    try {
      const deletePromises = checkedItems.map(async (id) => {
        const deleted = await axios.delete(
          `https://select-assessment-4ddb2ccc56ef.herokuapp.com/${id}`
        );
        return deleted.data;
      });
      const results = await Promise.all(deletePromises);
      console.log('The following invoices were deleted: ', results);
      setCheckedItems([]);
      getData('/getAll');
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="table-wrapper">
      <div className="invoice-table-container">
        {loading ? (
          <div className="loading-container">
            <BounceLoader
              color={'white'}
              loading
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            <InvoiceTable
              data={data}
              setData={setData}
              setCheckedItems={setCheckedItems}
              checkedItems={checkedItems}
              showStatus={showStatus}
            />
          </>
        )}
        <div className="btn-container">
          <IncButton
            text={'Approve Selected Invoices'}
            onClick={approveInvoice}
            loading={btnLoading}
            disabled={!checkedItems.length || showStatus}
          />
          &nbsp;
          <IncButton
            text={`${!showStatus ? 'View' : 'Hide'} All Invoice Statuses`}
            onClick={() => {
              setShowStatus(!showStatus ? true : false);
              setLoading(true);
              getData(!showStatus ? '/getAll' : '/');
            }}
            loading={btnLoading}
            disabled={loading}
          />
          &nbsp;
          {showStatus && (
            <IncButton
              text="Delete Invoice"
              onClick={deleteInvoice}
              loading={btnLoading}
              disabled={!checkedItems.length}
            />
          )}
        </div>
      </div>
      <div className="add-invoice-container">
        <AddInvoice getData={getData} />
      </div>
    </div>
  );
}

export default App;
