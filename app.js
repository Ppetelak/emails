// app.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const fileRoutes = require('./routes/fileRoutes');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Usando as rotas para listar diretórios e arquivos
app.use('/', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
