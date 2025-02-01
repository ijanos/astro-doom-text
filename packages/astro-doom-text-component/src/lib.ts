import { createCanvas, ImageData, loadImage } from 'canvas';
import { FontList, type Fonts } from './fonts.ts';

const parseRegEx = /^(\d+)x(\d+)[+](\d+)[+](\d+)(?:@(-?\d+),(-?\d+))?$/;

function getWidth(imageData: ImageData, width: number, height: number) {
  for (let x = width - 1; x > 0; x--) {
    for (let y = 0; y < height; y++) {
      const index = (y * width + x) * 4;
      if (imageData.data[index + 3] != 0) {
        return x + 1;
      }
    }
  }
  return 0;
}


async function createPngDataUrl(text: string, targetScale: number, selectedFont: Fonts) {
  const font = FontList[selectedFont];
  const buffer = Buffer.from(font.palette, 'base64');
  const palette = await loadImage(buffer);
  const scale = Math.max(1, targetScale);
  const MAX_WIDTH = 5000;
  const canvas = createCanvas(MAX_WIDTH, font.line_height * scale);
  const ctx = canvas.getContext('2d');

  ctx.imageSmoothingEnabled = false;
  ctx.patternQuality = "nearest";
  ctx.quality = 'nearest';

  let currentX = 0;

  function drawLetter(letter: string) {
    if (letter == ' ') {
      currentX += font.space_width;
      return;
    }

    if (letter in font.glyphs == false) {
      letter = letter.toLowerCase();
    }
    if (letter in font.glyphs == false) {
      letter = letter.toUpperCase();
    }
    if (letter in font.glyphs == false) {
      console.warn(`Missing glyph '${letter}'`);
      return;
    }

    const offset = font.glyphs[letter];

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

  text.split('').forEach(drawLetter);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let w = getWidth(imageData, canvas.width, canvas.height);

  if (w < 1) {
    console.warn(`Empty image, probably no matching glpyhs for '${ text }'`);
    w = 1;
  }

  const cut = ctx.getImageData(0, 0, w, canvas.height);

  const outcanvas = createCanvas(w, canvas.height);
  const cctx = outcanvas.getContext('2d');
  cctx.putImageData(cut, 0, 0);

  return outcanvas.toDataURL();
}

export default createPngDataUrl;
