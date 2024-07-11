// src/loggerMiddleware.js
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const logFilePath = path.join(__dirname, process.env.LOG_FOLDER || 'logs', 'access.log');

const logRequest = (format) => (req, res, next) => {
  const now = new Date();
  const formattedDate = now.toISOString();
  const { method, originalUrl, httpVersion, headers } = req;

  let logMessage;

  if (format === 'simples') {
    logMessage = `${formattedDate} - ${method} ${originalUrl}\n`;
  } else if (format === 'completo') {
    const userAgent = headers['user-agent'] || 'unknown';
    logMessage = `${formattedDate} - ${method} ${originalUrl} HTTP/${httpVersion} - ${userAgent}\n`;
  } else {
    return next(new Error('Formato de log não suportado.'));
  }

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Erro ao gravar no arquivo de log:', err);
    }
  });

  next();
};

module.exports = logRequest;
