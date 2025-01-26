import doomSmall  from './fonts/doom-small.ts';
import doomBigFont  from './fonts/doom-bigfont.ts';
import doomBigUpper  from './fonts/doom-bigupper.ts';
import doomNightmare  from './fonts/doom-nightmare.ts';
import hereticSmall from './fonts/heretic-small.ts';
import hereticMenu from './fonts/heretic-menu.ts';
import zdoomConsole from './fonts/zdoom-console.ts';
import dn3dSmall from './fonts/dn3d-small.ts';
import dn3dBig from './fonts/dn3d-big.ts';
import dn3dAtomic from './fonts/dn3d-atomic.ts';

interface FontMetadata {
    name: string;
    desc: string;
    creator: string[] | string;
    license: string;
    format: string;
    source: string;
    source_url?: string;
}
interface Font {
    glyphs: Record<string, string>;
    type?: string;
    space_width: number;
    line_height: number;
    baseline?: number;
    lightness_range: number[];
    meta: FontMetadata;
    palette: string;
}

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

// I couldn't figure out how to import the png directly or how to copy the png
// into the build dir so relative paths don't break. I kept digging into Astro and
// Vite then just gave up and converted to image to a base64 string.
// Look, I'm not a JavaScript dev. If it works it works.

export const FontList: Record<Fonts, Font> = {
    'doom-small': doomSmall,
    'doom-bigupper': doomBigUpper,
    'doom-nightmare': doomNightmare,
    'doom-bigfont': doomBigFont,
    'heretic-small': hereticSmall,
    'heretic-menu': hereticMenu,
    'zdoom-console': zdoomConsole,
    'dn3d-small': dn3dSmall,
    'dn3d-big': dn3dBig,
    'dn3d-atomic': dn3dAtomic
}
