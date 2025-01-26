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
  expect(imgElement?.src).toContain("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAAAOCAYAAACLgkZmAAAABmJLR0QA/wD/AP+gvaeTAAACL0lEQVRoge2aL1NCQRTFLw6RD0AwGowEooEZC4FoIBqMBKPBaDAajHwAg9FgccZgNBAJRAMfgI7B+xvgwGN57IrOmz3lvH2798++Zc8+7rzaudncIvBmVltux/oL+VeE4oXsf9tfqnhl80o9PnV+irLx1d9RGeOMjP+KOhf3zhPnoQy8cj5zvpR+dlTX223nhvCH85PYE79Z4D+EWHvyZ37X0v+wuJybpVfmR2kPJC8dx/P7sFXEzkPXuWGboX7AvutAnJ5zV+7zu3yXuOSfFTmjEqiHh/yAHTaV+6rEPel/cX4N+B85n+yaUCJ7VbC+s55InXXTpMqM4jTlPgqMQs+cj2Vc7DzAUBjgF3uND/ZdB+b1JAxaEn8Jc7OsyBkVwZois5NuCwxUMQA7lHcadljHmXfmT+eQQh8a5M+Jo/m1ZdxvgeeHAs6kHULsPDgBitYZv3fOu1YtdoX+7oiD0veln/llRc6oBNYUOVS1KHr3GTs3hd+dyypwd3G5104va//ljPJ1pX8q41ID/zzftvTTntl2xM6DftbvwhklJL+lE2Lr8y27DpxIeiK0pD2WdlbkjEpg56rFTBgs/Wufm5mdeoMdhZJ0nIsUXxWiJ6wYSHtfe80fUH8lX6ov1G1T15GB1m1vnHl3nNhmxM5D33FHtgqqCORR9I4du46KZ2dOCq2C5TpyRqVQ++tvLWL/9aayB4f+1iIUNzS/onwO9a2F+kv9rU0oHsiKnFEJfAPBW6DHAP12NgAAAABJRU5ErkJggg==");
});
