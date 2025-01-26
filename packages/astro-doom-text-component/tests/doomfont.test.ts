// @vitest-environment happy-dom

import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import { imageSize } from 'image-size';
import DoomText from '../src/DoomText.astro';

async function createDoomTextComponenet(text: string, scale: number = 2) {
  const container = await AstroContainer.create();
  return container.renderToString(DoomText, {
    props: {
        text: text,
        scale: scale
        // font?: Fonts;
    }
  });
}

function createHTMLImageElementFromString(img: string) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(img, 'text/html');
  return dom.querySelector('img');
}

test('DoomText component creates a valid HTMLImageElement', async () => {
  const text = "hello world";
  const container = await AstroContainer.create();
  const result = await container.renderToString(DoomText, {
    props: {
        text: text
    }
  });

  const parser = new DOMParser();
  const dom = parser.parseFromString(result, 'text/html');
  const imgElement = dom.querySelector('img');

  expect(imgElement).toBeDefined();
  expect(imgElement).toBeInstanceOf(HTMLImageElement);
  expect(imgElement?.alt).toContain(text);
  expect(imgElement?.title).toContain(text);
  expect(imgElement?.src).toContain("data:image/png;base64,");
});


test('DoomText image is the correct size', async () => {
  const text = "hello world";
  const component = createDoomTextComponenet(text);
  const imgElement = createHTMLImageElementFromString(await component);

  const b64Image = imgElement?.src.split(',')[1] as string;
  const buffer = Buffer.from(b64Image, 'base64');
  const dimensions = imageSize(buffer);
  expect(dimensions.height).toBe(16);
  expect(dimensions.width).toBe(178);
});

test('DoomText image is empty when text is empty', async () => {
  const text = "";
  const component = createDoomTextComponenet(text);
  const imgElement = createHTMLImageElementFromString(await component);
  expect(imgElement?.src).toBe("data:null");
});

test('DoomText can be scaled', async () => {
  const text = "hello world";
  let component = createDoomTextComponenet(text);
  let imgElement = createHTMLImageElementFromString(await component);

  let b64Image = imgElement?.src.split(',')[1] as string;
  let buffer = Buffer.from(b64Image, 'base64');
  let dimensions = imageSize(buffer);
  expect(dimensions.height).toBe(16);
  expect(dimensions.width).toBe(178);

  component = createDoomTextComponenet(text, 4);
  imgElement = createHTMLImageElementFromString(await component);

  b64Image = imgElement?.src.split(',')[1] as string;
  buffer = Buffer.from(b64Image, 'base64');
  dimensions = imageSize(buffer);
  expect(dimensions.height).toBe(32);
  expect(dimensions.width).toBe(356);
});
