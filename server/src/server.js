const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
