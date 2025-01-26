// @vitest-environment happy-dom

import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import DoomText from '../src/DoomText.astro';

test('DoomText component creates a valid HTMLImageElement', async () => {
  const text = "hello world";
  const container = await AstroContainer.create();
  const result = await container.renderToString(DoomText, {
    props: {
        text: text
        // scale?: number;
        // font?: Fonts;
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
