const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = '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';

const outputDir = path.join(__dirname, 'images', 'branding', 'logo-variations');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const logoVariations = [
  {
    name: 'v1-power-nozzle',
    prompt: `Create a professional square logo (512x512 pixels) for "Same Day JetWash" pressure washing service.

DESIGN CONCEPT: Power & Precision
- Stylized pressure washer nozzle shooting powerful water spray
- Angular, dynamic design suggesting high pressure and speed
- Water spray in sharp, precise streams
- Modern geometric shapes

COLOR PALETTE:
- Deep navy blue (#003D7A) for nozzle/equipment
- Electric bright cyan (#00D9FF) for water spray
- White highlights for spray sparkle
- Optional metallic silver accents

STYLE:
- Bold, modern, professional
- Sharp angles and clean lines
- High energy and dynamic
- Works at small sizes
- Square format, centered composition`
  },

  {
    name: 'v2-water-shield',
    prompt: `Create a professional square logo (512x512 pixels) for "Same Day JetWash" pressure washing service.

DESIGN CONCEPT: Protection & Trust
- Shield or badge shape as main element
- Water droplets or cleaning spray incorporated into shield
- Circular water splash pattern
- Professional service emblem aesthetic

COLOR PALETTE:
- Royal blue (#0052CC) for shield/badge
- Fresh aqua (#00BCD4) for water elements
- Clean white for highlights
- Optional gradient from blue to cyan

STYLE:
- Trustworthy, established business feel
- Circular or shield composition
- Professional badge/emblem style
- Premium service quality
- Balanced, symmetrical design`
  },

  {
    name: 'v3-clean-wave',
    prompt: `Create a professional square logo (512x512 pixels) for "Same Day JetWash" pressure washing service.

DESIGN CONCEPT: Purity & Freshness
- Abstract water wave or swoosh design
- Circular shape suggesting completeness/thoroughness
- Clean, flowing water forms
- Minimalist modern aesthetic

COLOR PALETTE:
- Bright sky blue (#0091EA)
- Turquoise cyan (#00E5FF) for highlights
- Pure white for clean areas
- Light blue gradients

STYLE:
- Clean, minimal, modern
- Flowing organic shapes
- Fresh and pure aesthetic
- Simple but memorable
- Works perfectly at any size`
  },

  {
    name: 'v4-droplet-burst',
    prompt: `Create a professional square logo (512x512 pixels) for "Same Day JetWash" pressure washing service.

DESIGN CONCEPT: Impact & Transformation
- Water droplet impact creating splash/burst
- Before/after suggestion with clean explosion
- Dynamic spray pattern radiating outward
- Energy and effectiveness

COLOR PALETTE:
- Deep ocean blue (#006DB7) for main elements
- Bright cyan (#00F5FF) for splash/spray
- White for spray particles
- Gradient transitions

STYLE:
- Dynamic and energetic
- Suggests instant transformation
- Action-oriented design
- Professional yet exciting
- Circular burst composition`
  },

  {
    name: 'v5-jet-stream',
    prompt: `Create a professional square logo (512x512 pixels) for "Same Day JetWash" pressure washing service.

DESIGN CONCEPT: Speed & Efficiency
- Horizontal jet stream of water
- Speed lines or motion blur
- Arrow-like forward momentum
- Fast, efficient service suggestion

COLOR PALETTE:
- Professional navy (#004080)
- Vibrant cyan (#00DDFF) for jet stream
- White motion lines
- Metallic blue accents

STYLE:
- Fast, efficient, modern
- Horizontal emphasis with circular frame
- Suggests speed and same-day service
- Professional and reliable
- Sharp, clean execution`
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
        'X-Title': 'JetWash Logo Variations'
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
  console.log('💧 Same Day JetWash - Logo Variations Generator');
  console.log('==============================================');
  console.log(`Output directory: ${outputDir}\n`);
  console.log('Generating 5 logo variations...\n');

  for (let i = 0; i < logoVariations.length; i++) {
    const logo = logoVariations[i];
    console.log(`\n[${i + 1}/5] 🎨 ${logo.name}...`);

    try {
      await generateImage(logo.prompt, logo.name);
    } catch (e) {
      console.error(`   ❌ Failed: ${e.message}`);
    }

    // Wait 3 seconds between requests
    if (i < logoVariations.length - 1) {
      console.log('   ⏳ Waiting 3 seconds...');
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log('\n==============================================');
  console.log('✨ Complete! Generated 5 logo variations.');
  console.log(`\nCheck: ${outputDir}`);
  console.log('\nVariations:');
  console.log('  1. v1-power-nozzle.png - Dynamic pressure washer nozzle');
  console.log('  2. v2-water-shield.png - Professional shield/badge design');
  console.log('  3. v3-clean-wave.png - Minimalist water wave');
  console.log('  4. v4-droplet-burst.png - Water impact splash');
  console.log('  5. v5-jet-stream.png - Speed and efficiency focus');
}

main().catch(console.error);
