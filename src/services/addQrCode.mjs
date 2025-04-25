import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import QRCode from "qrcode";
import sharp from "sharp";
import path from "node:path";

async function QrGenerator(imagePath, outputPath, uniqueData) {
  const qrcodeBuffer = await QRCode.toBuffer(uniqueData, {
    width: 200,
    margin: 1,
  });
  const originalImg = sharp(imagePath);
  const metadata = await originalImg.metadata();

  const out = await originalImg
    .composite([
      {
        input: qrcodeBuffer,
        top: metadata.height - 200,
        left: metadata.width - 200,
      },
    ])
    .toFile(outputPath);

  console.log("img with qrc generated");

  return out;
}

export default QrGenerator;

// app.get('/img', async (req, res) => {
//     const name = req.query.name;
//     const DateInstant = new Date();
//     let monthExp = Number(DateInstant.getMonth()) + 2;
//     const expDate = new Date(DateInstant.setMonth(monthExp));
//     await QrGenerator('./document.png', `${name}.png`, expDate.toDateString());
//     const docUrl = path.resolve(dirname(`./${name}.png`), `${name}.png`);
//     const imgstream = readFileSync(docUrl);
//     const imgto64 = imgstream.toString('base64')
//     res.setHeader('content-type', 'application/json');
//     res.send({ img: imgto64, date: expDate.toDateString() });
//     res.end();
//     console.log('file send!', imgstream)
// })

// app.listen(port, () => {
//     console.log('server on port %d', port)
// })
