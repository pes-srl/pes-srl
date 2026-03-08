const fs = require('fs');

let c = fs.readFileSync('src/components/player/BasicHeroChannel.tsx', 'utf8');

// Color mapping for page2026 aesthetics
const mapping = {
    'emerald': '[#D8B2A3]',
    'teal': '[#AB7169]',
    'sky': '[#D8B2A3]',
    'amber': '[#D8B2A3]',
    'indigo': '[#5D6676]',
    'purple': '[#5D6676]',
    'fuchsia': '[#AB7169]',
    'orange': '[#D8B2A3]',
    'rose': '[#AB7169]',
    'red': '[#AB7169]',
};

for (const [color, hex] of Object.entries(mapping)) {
    const rx = new RegExp(color + '-\\d{3}(\\/\\d+)?', 'g');
    c = c.replace(rx, (m) => {
        return m.includes('/') ? hex + m.substring(m.indexOf('/')) : hex;
    });
}

c = c.replace(/from-\[\#061e16\]/g, 'from-[#AB7169]/10');
c = c.replace(/to-\[\#010906\]/g, 'to-[#2e1d1b]');
c = c.replace(/bg-\[\#0f0518\]/g, 'bg-[#2b2730]');

// Rename the component
c = c.replace(/BasicHeroChannel/g, 'BasicHeroChannel2');

fs.writeFileSync('src/components/draft2026/BasicHeroChannel2.tsx', c);
