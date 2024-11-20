const express = require('express');
const Invoice = require('./models/Invoices');
const router = express.Router();

// get all pending invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find(
      { status: 'pending' },
      'invoice_number total currency invoice_date due_date vendor_name remittance_address status'
    );
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending invoices' });
  }
});

// get all invoices
router.get('/getAll', async (req, res) => {
  try {
    const invoices = await Invoice.find(
      {},
      'invoice_number total currency invoice_date due_date vendor_name remittance_address status'
    );
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all invoices' });
  }
});

// add an invoice
router.post('/', async (req, res) => {
  const {
    invoice_number,
    total,
    currency,
    invoice_date,
    due_date,
    vendor_name,
    remittance_address,
    status,
  } = req.body;

  try {
    const newInvoice = new Invoice({
      invoice_number,
      total,
      currency,
      invoice_date: invoice_date?.split('T')[0],
      due_date: due_date?.split('T')[0],
      vendor_name,
      remittance_address,
      status: status ? status : 'pending',
    });

    const savedInvoice = await newInvoice.save();
    res
      .status(201)
      .json({ message: 'Invoice added successfully.', savedInvoice });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create invoice' });
  }
});

// update an invoice
router.put('/', async (req, res) => {
  try {
    const { _id } = req.body;
    const updatedInvoice = await Invoice.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: 'Invoice submitted successfully.', updatedInvoice });
  } catch (err) {
    res.status(400).json({ error: 'Failed to update invoice' });
  }
});

// delete an invoice
router.delete('/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    res.json({ message: 'Invoice deleted successfully', deletedInvoice });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

module.exports = router;
