// routes/fileRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const uploadsPath = path.join(__dirname, '../uploads');

// Função para listar arquivos e pastas
function listDirectory(dirPath, relativePath = '') {
  return fs.readdirSync(dirPath).map(file => {
    const fullPath = path.join(dirPath, file);
    const isDirectory = fs.lstatSync(fullPath).isDirectory();
    return {
      name: file,
      path: path.join(relativePath, file),
      isDirectory: isDirectory
    };
  });
}

// Página inicial e navegação por diretórios
router.get('/*', (req, res) => {
  const relativePath = req.params[0] || ''; // Pega o caminho relativo da URL
  const dirPath = path.join(uploadsPath, relativePath);

  // Verifica se o caminho é um diretório
  if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
    const files = listDirectory(dirPath, relativePath); // Listar arquivos e pastas
    res.render('index', { files, currentPath: relativePath }); // Renderiza a página com a lista de arquivos/pastas
  } 
  // Verifica se o caminho é um arquivo HTML
  else if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isFile() && path.extname(dirPath) === '.html') {
    fs.readFile(dirPath, 'utf-8', (err, content) => {
      if (err) return res.status(500).send('Erro ao abrir arquivo.');
      res.render('render', { content });
    });
  } 
  // Caso o caminho não exista ou seja inválido
  else {
    res.status(404).send('Diretório ou arquivo não encontrado');
  }
});

module.exports = router;
