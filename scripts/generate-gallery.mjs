// Renders every badge variant (mode x icon x effect) as a static SVG into
// assets/badges/, for the gallery in the README. Run with: npm run gallery
import { mkdirSync, writeFileSync } from 'node:fs';
import { generateCounterBadge, generateSymbolBadge } from '../api/views.js';

// The number shown on the static counter badges.
const DEMO_COUNT = 1337;

const outDir = new URL('../assets/badges/', import.meta.url);
mkdirSync(outDir, { recursive: true });

for (const icon of ['eye', 'ring']) {
    for (const effect of ['none', 'rainbow', 'gradient']) {
        writeFileSync(
            new URL(`counter-${icon}-${effect}.svg`, outDir),
            generateCounterBadge(DEMO_COUNT, icon, effect).trim(),
        );
        writeFileSync(
            new URL(`symbols-${icon}-${effect}.svg`, outDir),
            generateSymbolBadge(icon, effect).trim(),
        );
    }
}

console.log('Wrote 12 badge variants to assets/badges/');
