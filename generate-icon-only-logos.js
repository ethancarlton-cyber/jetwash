const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = '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';

const outputDir = path.join(__dirname, 'images', 'branding', 'icon-only');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const iconLogos = [
  {
    name: 'icon-v1-spray-nozzle',
    prompt: `Create a professional icon-only logo (512x512 pixels) for a pressure washing company.

CRITICAL: NO TEXT - icon/symbol only!

DESIGN: Pressure Washer Nozzle
- Stylized pressure washer nozzle spraying water
- Dynamic water spray shooting out in angular streams
- Modern, geometric design
- Recognizable at small sizes

COMPOSITION:
- Centered circular design
- Nozzle at angle (diagonal)
- Powerful water spray radiating outward
- Clean, bold shapes

COLORS:
- Deep navy blue (#003D7A) for nozzle
- Bright electric cyan (#00DDFF) for water spray
- White highlights on spray droplets
- Clean white or transparent background

STYLE:
- Professional, modern
- High contrast for visibility
- Works at 16x16 pixels
- No text, no words, icon only`
  },

  {
    name: 'icon-v2-water-droplet',
    prompt: `Create a professional icon-only logo (512x512 pixels) for a pressure washing company.

CRITICAL: NO TEXT - pure icon only!

DESIGN: Water Droplet with Power
- Large water droplet as main shape
- Internal cleaning/power element (lightning bolt or spray burst inside droplet)
- Clean, simple, memorable
- Premium water service aesthetic

COMPOSITION:
- Centered water droplet shape
- Power symbol or spray pattern inside
- Circular or droplet-shaped overall design
- Balanced, symmetrical

COLORS:
- Bright sky blue (#0091EA) for droplet outline
- Cyan (#00E5FF) for internal elements
- White highlights
- Optional gradient effect
- Clean background

STYLE:
- Simple, clean, modern
- Instantly recognizable
- Friendly yet professional
- No text whatsoever`
  },

  {
    name: 'icon-v3-circular-splash',
    prompt: `Create a professional icon-only logo (512x512 pixels) for a pressure washing company.

CRITICAL: ICON ONLY - absolutely no text!

DESIGN: Circular Water Splash
- Circular splash pattern suggesting water impact
- Clean, fresh water burst
- Dynamic but balanced design
- Suggests transformation and cleanliness

COMPOSITION:
- Perfect circle as outer boundary
- Water splash radiating from center
- Droplets and spray particles
- Symmetrical splash pattern

COLORS:
- Royal blue (#0052CC) outer circle
- Fresh aqua (#00BCD4) for splash
- White spray particles
- Clean, bright palette
- Light or transparent background

STYLE:
- Clean, professional
- Energetic but controlled
- Premium service quality
- Icon only, no typography`
  },

  {
    name: 'icon-v4-shield-water',
    prompt: `Create a professional icon-only logo (512x512 pixels) for a pressure washing company.

CRITICAL: NO TEXT OR WORDS - icon mark only!

DESIGN: Shield with Water Element
- Shield or badge shape
- Water droplet or spray incorporated into shield
- Professional, trustworthy emblem
- Premium service symbol

COMPOSITION:
- Shield or badge outline
- Water element as central focus
- Balanced, symmetrical design
- Professional emblem style

COLORS:
- Navy blue (#004080) for shield
- Bright cyan (#00DDFF) for water
- White accents
- Clean contrasts
- Professional color scheme

STYLE:
- Trustworthy, established
- Premium quality
- Classic yet modern
- Pure icon, zero text`
  },

  {
    name: 'icon-v5-minimal-wave',
    prompt: `Create a professional icon-only logo (512x512 pixels) for a pressure washing company.

CRITICAL: ICON ONLY - no text, no letters, no words!

DESIGN: Minimalist Water Wave
- Abstract water wave or swoosh
- Clean, flowing design
- Modern minimalist aesthetic
- Suggests purity and freshness

COMPOSITION:
- Circular frame
- Elegant water wave inside
- Possibly droplet element
- Simple, memorable shape
- Centered, balanced

COLORS:
- Turquoise (#00BCD4) for wave
- Deep blue (#0066CC) for accents
- White highlights
- Very clean, pure aesthetic
- Light background

STYLE:
- Ultra minimal, modern
- Clean and sophisticated
- Premium residential service
- No text - visual mark only`
  }
];

async function generateImage(prompt, name) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: 'google/gemini-3-pro-image-preview',
      messages: [{ role: 'user', content: prompt }]
    });

    const options = {
      hostname: 'openrouter.ai',
      port: 443,
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://samedayjetwash.com',
        'X-Title': 'JetWash Icon Only Logos'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.error) {
            reject(new Error(`API Error: ${response.error.message || JSON.stringify(response.error)}`));
            return;
          }
          const message = response.choices?.[0]?.message;
          if (!message?.images?.[0]) {
            reject(new Error('No image in response'));
            return;
          }
          const imageData = message.images[0];
          let base64Data = imageData.image_url?.url?.replace(/^data:image\/\w+;base64,/, '')
                        || imageData.data
                        || (typeof imageData === 'string' ? imageData.replace(/^data:image\/\w+;base64,/, '') : null);

          if (!base64Data) {
            reject(new Error('Could not extract image from response'));
            return;
          }
          const buffer = Buffer.from(base64Data, 'base64');
          const filePath = path.join(outputDir, `${name}.png`);
          fs.writeFileSync(filePath, buffer);
          console.log(`✅ Generated: ${name}.png`);
          resolve(filePath);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => reject(new Error(`Request error: ${e.message}`)));
    req.setTimeout(180000, () => { req.destroy(); reject(new Error('Request timeout after 180 seconds')); });
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('💧 Same Day JetWash - Icon-Only Logo Generator');
  console.log('==============================================');
  console.log(`Output directory: ${outputDir}\n`);
  console.log('Generating 5 icon-only logos (NO TEXT)...\n');

  for (let i = 0; i < iconLogos.length; i++) {
    const logo = iconLogos[i];
    console.log(`\n[${i + 1}/5] 🎨 ${logo.name}...`);

    try {
      await generateImage(logo.prompt, logo.name);
    } catch (e) {
      console.error(`   ❌ Failed: ${e.message}`);
    }

    // Wait 3 seconds between requests
    if (i < iconLogos.length - 1) {
      console.log('   ⏳ Waiting 3 seconds...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log('\n==============================================');
  console.log('✨ Complete! Generated 5 icon-only logos.');
  console.log(`\nCheck: ${outputDir}`);
  console.log('\nIcons (no text):');
  console.log('  1. icon-v1-spray-nozzle.png - Pressure washer nozzle with spray');
  console.log('  2. icon-v2-water-droplet.png - Droplet with power element');
  console.log('  3. icon-v3-circular-splash.png - Circular water splash');
  console.log('  4. icon-v4-shield-water.png - Shield emblem with water');
  console.log('  5. icon-v5-minimal-wave.png - Minimalist water wave');
}

main().catch(console.error);
