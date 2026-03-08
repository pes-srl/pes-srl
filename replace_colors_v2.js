const fs = require('fs');

let c = fs.readFileSync('src/app/area-riservata-2/page.tsx', 'utf8');

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

// Change components and imports
c = c.replace(/AreaClientePage/g, 'AreaClientePage2');

c = c.replace(/import \{ ChannelGrid \} from "@\/components\/player\/ChannelGrid";/g, 'import { ChannelGrid2 } from "@/components/draft2026/ChannelGrid2";');
c = c.replace(/import \{ BasicHeroChannel \} from "@\/components\/player\/BasicHeroChannel";/g, 'import { BasicHeroChannel2 } from "@/components/draft2026/BasicHeroChannel2";');
c = c.replace(/import \{ UpgradeFormTrial \} from "@\/components\/UpgradeFormTrial";/g, 'import { UpgradeFormTrial2 } from "@/components/draft2026/UpgradeFormTrial2";');
c = c.replace(/import \{ Paywall \} from "\.\/Paywall";/g, 'import { Paywall } from "../area-riservata/Paywall";');

c = c.replace(/<ChannelGrid /g, '<ChannelGrid2 ');
c = c.replace(/<BasicHeroChannel/g, '<BasicHeroChannel2');
c = c.replace(/<UpgradeFormTrial /g, '<UpgradeFormTrial2 ');

fs.writeFileSync('src/app/area-riservata-2/page.tsx', c);
