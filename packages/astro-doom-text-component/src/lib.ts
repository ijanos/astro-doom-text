import { createCanvas, loadImage } from 'canvas';

// I couldn't figure out how to import the png directly or how to copy the png
// into the build dir so relative paths don't break. I kept digging into Astro and
// Vite then just gave up and converted to image to a base64 string that I simply
// import. Look, I'm not a JavaScript dev. If it works it works.

import doomSmallPalette_b64 from './doom-small.png.b64?raw'

const buffer = Buffer.from(doomSmallPalette_b64, 'base64');
const palette = await loadImage(buffer);
const parseRegEx = /^(\d+)x(\d+)[+](\d+)[+](\d+)(?:@(-?\d+),(-?\d+))?$/;

const doom_small = {
  "glyphs": {
    "!": "4x7+0+0",
    "\"": "7x4+9+0",
    "#": "7x7+18+0",
    "$": "7x8+27+0",
    "%": "9x7+36+0",
    "&": "8x7+45+0",
    "'": "4x4+54+0",
    "(": "7x7+63+0",
    ")": "7x7+0+8",
    "*": "7x7+9+8",
    "+": "5x5+18+8@0,1",
    ",": "4x4+27+8@0,3",
    "-": "6x3+36+8@0,2",
    ".": "4x3+45+8@0,4",
    "/": "7x7+54+8",
    "0": "8x7+63+8",
    "1": "5x7+0+16",
    "2": "8x7+9+16",
    "3": "8x7+18+16",
    "4": "7x7+27+16",
    "5": "7x7+36+16",
    "6": "8x7+45+16",
    "7": "8x7+54+16",
    "8": "8x7+63+16",
    "9": "8x7+0+24",
    ":": "4x7+9+24",
    ";": "4x7+18+24",
    "<": "5x7+27+24",
    "=": "5x5+36+24@0,1",
    ">": "5x7+45+24",
    "?": "8x7+54+24",
    "@": "9x8+63+24",
    "A": "8x7+0+32",
    "B": "8x7+9+32",
    "C": "8x7+18+32",
    "D": "8x7+27+32",
    "E": "8x7+36+32",
    "F": "8x7+45+32",
    "G": "8x7+54+32",
    "H": "8x7+63+32",
    "I": "4x7+0+40",
    "J": "8x7+9+40",
    "K": "8x7+18+40",
    "L": "8x7+27+40",
    "M": "9x7+36+40",
    "N": "8x7+45+40",
    "O": "8x7+54+40",
    "P": "8x7+63+40",
    "Q": "8x8+0+48",
    "R": "8x7+9+48",
    "S": "7x7+18+48",
    "T": "8x7+27+48",
    "U": "8x7+36+48",
    "V": "7x7+45+48",
    "W": "9x7+54+48",
    "X": "9x7+63+48",
    "Y": "8x7+0+56",
    "Z": "7x7+9+56",
    "[": "5x7+18+56",
    "\\": "7x7+27+56",
    "]": "5x7+36+56",
    "^": "7x5+45+56",
    "_": "8x3+54+56@0,4",
    "|": "4x7+63+56"
  },
  "image": "doom-small.png",
  "space_width": 4,
  "line_height": 8,
  "kerning": 0,
  "lightness_range": [
    20.032999999999998,
    76.24499999999999
  ],
  "meta": {
    "name": "Doom \u2014 small font",
    "creator": "id software",
    "license": "commercial",
    "source": "STCFN___ lumps from doom2.wad"
  }
};


async function createPngDataUrl(text: string, targetScale: number) {
  const scale = Math.max(1, targetScale);
  const MAX_WIDTH = 5000;
  const canvas = createCanvas(MAX_WIDTH, (doom_small.line_height - 1) * scale);
  const ctx = canvas.getContext('2d');

  ctx.imageSmoothingEnabled = false;
  ctx.patternQuality = "nearest";
  ctx.quality = 'nearest';

  let currentX = 0;

  function drawLetter(letter: string) {
    if (letter == ' ') {
      currentX += 8;
      return;
    }
    if (letter in doom_small.glyphs == false) {
      console.warn(`Missing glyph '${letter}'`);
      return;
    }

    // this is a hack to satisfy TypeScript
    const l = letter as keyof typeof doom_small.glyphs;
    const offset = doom_small.glyphs[l];

    const [_, width, height, x, y, dx, dy] = offset.match(parseRegEx) || [];
    const glyph = {
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        x: parseInt(x, 10),
        y: parseInt(y, 10),
        dx: parseInt(dx ?? '0', 10),
        dy: parseInt(dy ?? '0', 10),
    };

    ctx.drawImage(palette,
      glyph.x, glyph.y,
      glyph.width, glyph.height,
      currentX * scale, glyph.dy * scale,
      glyph.width * scale, glyph.height * scale
    );
    currentX += glyph.width;
  }

  const getWidth = function () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let x = canvas.width - 1; x > 0; x--) {
      for (let y = 0; y < canvas.height; y++) {
        const index = (y * canvas.width + x) * 4;
        if (imageData.data[index + 3] != 0) {
          return x + 1;
        }
      }
    }
    return 0;
  }


  text.split('').forEach(drawLetter);

  const w = getWidth();

  if (w < 1) {
    console.log("Empty pictue, probably no matching glpyhs");
    return;
  }

  const cut = ctx.getImageData(0, 0, w, canvas.height);

  const outcanvas = createCanvas(w, canvas.height);
  const cctx = outcanvas.getContext('2d');
  cctx.putImageData(cut, 0, 0);

  const pngDataUrl = outcanvas.toDataURL();

  return pngDataUrl;

}

export default createPngDataUrl;
