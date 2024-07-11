require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Usa a variável de ambiente PORT, se definida

// Rota principal
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
