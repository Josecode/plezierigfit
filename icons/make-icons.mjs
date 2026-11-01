// Genereert icons/icon-192.png en icon-512.png (geen externe deps)
import zlib from "node:zlib";
import fs from "node:fs";

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function makePng(size) {
  const bg = [0x12, 0x5c, 0x2d];      // donker groen
  const fg = [0xff, 0xff, 0xff];      // wit hart
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (size * 4 + 1);
    raw[rowStart] = 0; // filter: none
    for (let x = 0; x < size; x++) {
      // ronde hoeken
      const r = size * 0.19;
      const inCorner = (x) => (x < r || x > size - 1 - r) && (y < r || y > size - 1 - r);
      let px = bg;
      if (inCorner()) {
        const cx = x < r ? r : size - 1 - r;
        const cy = y < r ? r : size - 1 - r;
        const d = Math.hypot(x - cx, y - cy);
        if (d > r) px = null;
      }
      if (px) {
        // hart: (x^2+y^2-1)^3 - x^2*y^3 < 0, geschaald rond middelpunt
        const nx = (x / size - 0.5) * 2.6;
        const ny = (y / size - 0.42) * 2.6;
        const h = Math.pow(nx * nx + ny * ny - 1, 3) - nx * nx * ny * ny * ny;
        if (h < 0) px = fg;
      }
      const o = rowStart + 1 + x * 4;
      if (px) { raw[o] = px[0]; raw[o + 1] = px[1]; raw[o + 2] = px[2]; raw[o + 3] = 255; }
      else { raw[o + 3] = 0; }
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

for (const s of [192, 512]) {
  fs.writeFileSync(new URL(`./icon-${s}.png`, import.meta.url), makePng(s));
  console.log("icon-" + s + ".png geschreven");
}
