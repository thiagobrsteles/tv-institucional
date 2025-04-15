
const fs = require("fs");
const path = require("path");

const base = "tv-conteudo";
const pastas = ["imagens", "videos"];
let arquivos = [];

for (const pasta of pastas) {
  const dir = path.join(__dirname, base, pasta);
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

fs.writeFileSync(
  path.join(__dirname, base, "data.json"),
  JSON.stringify(arquivos, null, 2)
);
console.log("✅ data.json gerado com sucesso!");
