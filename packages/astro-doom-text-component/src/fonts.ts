import doomSmall  from './fonts/doom-small.ts';
import doomBigFont  from './fonts/doom-bigfont.ts';
import doomBigUpper  from './fonts/doom-bigupper.ts';
import doomNightmare  from './fonts/doom-nightmare.ts';
import hereticSmall from './fonts/heretic-small.ts';

export type Fonts =
    'doom-small' |
    'doom-bigupper' |
    'doom-nightmare' |
    'doom-bigfont' |
    'heretic-small';

// I couldn't figure out how to import the png directly or how to copy the png
// into the build dir so relative paths don't break. I kept digging into Astro and
// Vite then just gave up and converted to image to a base64 string.
// Look, I'm not a JavaScript dev. If it works it works.

export const FontList = {
    'doom-small': doomSmall,
    'doom-bigupper': doomBigUpper,
    'doom-nightmare': doomNightmare,
    'doom-bigfont': doomBigFont,
    'heretic-small': hereticSmall
}
