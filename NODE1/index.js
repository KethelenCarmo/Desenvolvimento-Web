const http = require('http');
const fs = require('fs');
require('dotenv').config();

const folderName = process.argv[2];
if (!folderName) {
  console.error('Por favor, forneça o nome do diretório como argumento.');
  process.exit(1);
}

let arquivos;
try {
  arquivos = fs.readdirSync(folderName);
} catch (err) {
  console.error('Erro ao ler o diretório:', err.message);
  process.exit(1);
}

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  res.write(`<pre>${arquivos.join("\n")}</pre>`);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
