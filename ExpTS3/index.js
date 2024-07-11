// src/index.js
const express = require('express');
const app = express();
const logRequest = require('./loggerMiddleware');
require('dotenv').config();

// Configure o middleware para usar o formato desejado
app.use(logRequest(process.env.LOG_FORMAT || 'simples'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
