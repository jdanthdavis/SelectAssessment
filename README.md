# Overview
[View live application](https://select-assessment.netlify.app/)

## Frontend

Built with Vite & React while being hosted on Netlify.

## Backend

Built with Node.js, Express, and MongoDB while being hosted on Heroku.

# Enhancements

## Table filtering

Allows the user to filter each column in either ascending or descending order.

## View All Invoice Statuses

To verify an invoice status was correctly updated there is a button that will display the `statuses` for every invoice. This can be toggled to hide or show all `statuses`.

## Loading states

Various `loading` states for entire components and buttons when call to actions are clicked.

## Currency Formatting
Formats `USD` currency `onBlur`. Does not require the user to enter `$, ., .`

## Invoice Deletion
Allows the user to `delete` selected invoice(s) when viewing *all* invoices.

## Invoice Creation

An input field that allows a user to add a new invoice. Every field is equipped with validation and does not allow submission if any errors are present. All fields are **required**. Upon submission a `POST` is sent and the table is refreshed to grab the newest invoice.

- `invoice_number` - numeric only
- `total` - numeric only
- `currency` - Defaulted to USD - any
- `invoice_date` - mm/dd/yyyy
- `due_date` - mm/dd/yyyy
- `vendor_name` - any
- `remittance_address` - any

# Libraries

- [Axios](https://www.npmjs.com/package/axios)
- [React-Spinners](https://www.npmjs.com/package/react-spinners)
- [Express](https://www.npmjs.com/package/express)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [CORs](https://www.npmjs.com/package/cors)
