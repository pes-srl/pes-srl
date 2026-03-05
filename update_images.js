const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Funzione semplice per caricare .env.local
function loadEnv() {
    try {
        const envFile = fs.readFileSync('.env.local', 'utf8');
        envFile.split('\n').forEach(line => {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                const key = match[1];
                let value = match[2] || '';
                if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
                    value = value.replace(/\\n/gm, '\n');
                }
                value = value.replace(/(^['"]|['"]$)/g, '').trim();
                process.env[key] = value;
            }
        });
    } catch (err) {
        console.warn('.env.local non trovato o inaccessibile');
    }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Mancano le variabili d'ambiente");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
    { name: 'Acoustic Vocal', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772711956443-0c141.png' },
    { name: 'Ambient Massage', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772711965648-uehbia.png' },
    { name: 'Deep Soft', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772711970634-ga34j.png' },
    { name: 'Jazz', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772711975176-33prtg.png' },
    { name: 'Lounge', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772711980565-7rgu6b.png' },
    { name: 'Relax', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772711985349-ctr4vh.png' },
    { name: 'Laser Channel', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772711945423-dp8yv8.png' },
    { name: 'Cosmetic Channel', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772712461054-8boimi.png' },
    { name: 'BeautiFy Basic', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772477175620-js0cpo.png' },
    { name: 'BeautiFy Premium', url: 'https://eufahlzjxbimyiwivoiq.supabase.co/storage/v1/object/public/bucket-assets/1772712680519-s9nxw5.png' }
];

async function run() {
    for (const item of updates) {
        const { data, error } = await supabase
            .from('radio_channels')
            .update({ card_image_url: item.url })
            .ilike('name', `%${item.name}%`);

        if (error) {
            console.error(`Errore durante l'aggiornamento di ${item.name}:`, error);
        } else {
            console.log(`Aggiornato con successo: ${item.name}`);
        }
    }
}

run();
