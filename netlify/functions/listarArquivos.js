
const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  const base = "tv-conteudo";
  const pastas = ["imagens", "videos"];
  let arquivos = [];

  try {
    for (const pasta of pastas) {
      const dir = path.join(__dirname, "..", "..", base, pasta);
      if (!fs.existsSync(dir)) continue;
      const lista = fs.readdirSync(dir);
      for (const nome of lista) {
        const tipo = nome.toLowerCase().endsWith(".mp4") ? "video" : "imagem";
        arquivos.push({
          nome,
          tipo,
          url: `/${base}/${pasta}/${nome}`
        });
      }
    }

    arquivos.sort((a, b) => a.nome.localeCompare(b.nome));
    return {
      statusCode: 200,
      body: JSON.stringify(arquivos)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: "Falha ao listar arquivos", detalhes: e.message })
    };
  }
};
