const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/sheds', require('./routes/sheds_routes'));


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is listening on ${port}`));