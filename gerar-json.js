const fs = require('fs');
const path = require('path');

function scanDir(folderPath) {
  const files = [];
  if (!fs.existsSync(folderPath)) return files;

  fs.readdirSync(folderPath).forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      const tipo = ext === '.mp4' ? 'video' : 'imagem';
      files.push({
        nome: file,
        tipo,
        url: `tv-conteudo/${tipo === 'video' ? 'videos' : 'imagens'}/${file}`
      });
    }
  });

  return files;
}

const imagens = scanDir('tv-conteudo/imagens');
const videos = scanDir('tv-conteudo/videos');
const todos = [...imagens, ...videos];

console.log('Arquivos encontrados:', todos); // <--- Esse log ajuda

fs.writeFileSync('tv-conteudo/data.json', JSON.stringify(todos, null, 2));
