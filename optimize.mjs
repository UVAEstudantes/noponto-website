import sharp from "sharp";
import { readdir } from "node:fs/promises";
for (const name of await readdir("public/images")) {
  if (name.endsWith(".jpeg"))
    await sharp(`public/images/${name}`)
      .resize({ width: 720, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(`public/images/${name.replace(".jpeg", ".webp")}`);
}
await sharp("public/images/logo.png")
  .resize(128)
  .webp({ quality: 90 })
  .toFile("public/images/logo.webp");
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#202620"/><path d="M-40 530H850Q1000 530 1000 380V-40" stroke="#ffc107" stroke-width="16" fill="none"/><circle cx="1000" cy="300" r="22" fill="#202620" stroke="#ffc107" stroke-width="12"/><text x="85" y="140" fill="#ffc107" font-family="Arial" font-size="35" font-weight="bold">NoPonto</text><text x="85" y="255" fill="#faf9f5" font-family="Arial" font-size="70" font-weight="bold">O transporte do Rio,</text><text x="85" y="340" fill="#faf9f5" font-family="Arial" font-size="70" font-weight="bold">mais perto de você.</text><text x="85" y="420" fill="#b8c1b2" font-family="Arial" font-size="25">Menos incerteza no ponto. Mais cidade no seu caminho.</text></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/images/social.png");
