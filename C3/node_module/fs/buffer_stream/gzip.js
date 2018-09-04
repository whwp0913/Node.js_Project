const zlib = require(`zlib`);
const fs = require(`fs`);

const readStream = fs.createReadStream(`writeme.txt`);
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream(`./giz.txt.gz`);
readStream.pipe(zlibStream).pipe(writeStream);
