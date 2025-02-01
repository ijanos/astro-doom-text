# Doom Text Astro component

This [Astro
integration](https://docs.astro.build/en/guides/integrations-guide/) provides a
`DoomText` component for [Astro](https://astro.build) which creates text using
fonts from the classic video game Doom.

## Installation

```sh
npm install astro-doom-text
```

## Usage

See the [demo page](https://ijanos.github.io/astro-doom-text/) for more
examples.


```astro
---
import { DoomText } from 'astro-doom-text';
---
<DoomText text="Hello World"/>
```

### Props

The `DoomText` component allows these custom properties:

```ts
interface Props {
	text: string;
	scale?: number;
	font?: Fonts;
}
```

The available fonts are:

```ts
export type Fonts =
    'doom-small' |
    'doom-bigupper' |
    'doom-nightmare' |
    'doom-bigfont' |
    'heretic-small' |
    'heretic-menu' |
    'zdoom-console' |
    'dn3d-small' |
    'dn3d-big' |
    'dn3d-atomic';
```


## Contributing

You're welcome to submit an issue or PR!


## License

The source code in the repository is licensed under either of
  - Apache License, Version 2.0, http://www.apache.org/licenses/LICENSE-2.0
  - MIT license http://opensource.org/licenses/MIT

at your option.

I extracted the fonts from [Eevee's Doom Text generator](https://github.com/eevee/doom-text-generator/).

> Most of the included fonts are commercial works extracted from commercial
> products, and I do not have permission to use them beyond the general air of
> quietly-tolerated remix culture in the Doom community and the fact that vanilla
> Doom requires a level graphic. C'est la vie.
