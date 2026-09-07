const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createSolidPng(width, height, r, g, b) {
  // Construct raw uncompressed scanlines
  // Each scanline: filter byte 0, then width * 4 (RGBA)
  const lineLength = 1 + width * 4;
  const rawData = Buffer.alloc(lineLength * height);

  for (let y = 0; y < height; y++) {
    const lineOffset = y * lineLength;
    rawData[lineOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const pixelOffset = lineOffset + 1 + x * 4;
      // Draw rounded rect border check
      const cx = width / 2;
      const cy = height / 2;
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      
      // Simple inner emblem: draw a stylized white cross/handshake in center
      const inCenterCircle = Math.hypot(x - cx, y - cy) < (width * 0.28);
      const inCenterCore = Math.hypot(x - cx, y - cy) < (width * 0.12);

      if (inCenterCircle && !inCenterCore) {
        rawData[pixelOffset] = 255;
        rawData[pixelOffset + 1] = 255;
        rawData[pixelOffset + 2] = 255;
        rawData[pixelOffset + 3] = 255;
      } else {
        rawData[pixelOffset] = r;
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
        rawData[pixelOffset + 3] = 255;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0; // Compression: 0
  ihdr[11] = 0; // Filter: 0
  ihdr[12] = 0; // Interlace: 0

  function createChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(8 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeInt32BE(crc, 8 + len);
    return buf;
  }

  // Basic CRC32 implementation
  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      let byte = buf[i];
      for (let j = 0; j < 8; j++) {
        if ((crc ^ byte) & 1) {
          crc = (crc >>> 1) ^ 0xEDB88320;
        } else {
          crc = crc >>> 1;
        }
        byte >>>= 1;
      }
    }
    return (crc ^ -1) | 0;
  }

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const iconsDir = path.join(__dirname, '../public/icons');
fs.mkdirSync(iconsDir, { recursive: true });

// Teal: rgb(13, 148, 136) -> #0d9488
const png192 = createSolidPng(192, 192, 13, 148, 136);
fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), png192);

const png512 = createSolidPng(512, 512, 13, 148, 136);
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), png512);

console.log('✅ Generated 192x192 and 512x512 PWA icons in public/icons/');
