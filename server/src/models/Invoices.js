const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoice_number: { type: String, required: true },
  total: { type: Number, required: true },
  currency: { type: String, required: true },
  invoice_date: { type: Date, required: true },
  due_date: { type: Date, required: true },
  vendor_name: { type: String, required: true },
  remittance_address: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Invoices', invoiceSchema);
