const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = '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';

const outputDir = path.join(__dirname, 'images', 'branding', 'icon-only');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const bannerPrompt = `Create a professional website hero banner (1920x400 pixels landscape) for a pressure washing company.

CRITICAL REQUIREMENT: This banner MUST match the style of the icon logo - same colors, same energy, same design language!

DESIGN STYLE TO MATCH:
- Dynamic, energetic water spray
- Navy blue (#003D7A) for equipment/nozzle
- Bright electric cyan (#00DDFF) for water spray
- White highlights on water droplets
- Bold circular rings/borders in blue
- High energy, powerful aesthetic

BANNER COMPOSITION:
- LEFT SIDE (40%): Pressure washer nozzle in action
  - Navy blue pressure washer gun/nozzle
  - Angled dynamically (same as icon)
  - Professional equipment detail

- CENTER TO RIGHT (60%): Powerful water spray
  - Bright cyan water streams shooting across banner
  - White sparkle highlights on water droplets
  - Dynamic spray particles and droplets
  - Motion and energy
  - Shows cleaning power and effectiveness

BACKGROUND:
- Clean white or very light background
- Blue circular gradient elements (matching icon's rings)
- Professional and clean
- Allows spray to really pop

COLOR PALETTE (EXACT MATCH TO ICON):
- Navy blue: #003D7A (nozzle, borders)
- Electric cyan: #00DDFF (water spray)
- White: highlights and droplets
- Light blue accents: #0091EA

STYLE REQUIREMENTS:
- NO TEXT - visual only
- Matches the circular badge icon perfectly
- Same energy and dynamism
- Professional pressure washing service
- Clean, modern, high impact
- 1920x400 pixels landscape format`;

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
        'X-Title': 'JetWash V1 Banner'
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
          console.log(`✅ Generated: ${filePath}`);
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
  console.log('💧 Same Day JetWash - V1 Matching Banner');
  console.log('========================================');
  console.log(`Output directory: ${outputDir}\n`);
  console.log('🎨 Generating banner to match icon-v1-spray-nozzle...\n');

  try {
    await generateImage(bannerPrompt, 'banner-v1-spray-nozzle-1920x400');
    console.log('\n========================================');
    console.log('✨ Complete! Banner matches icon V1 style.');
    console.log(`\nFiles in: ${outputDir}`);
    console.log('  - icon-v1-spray-nozzle.png (logo)');
    console.log('  - banner-v1-spray-nozzle-1920x400.png (banner)');
  } catch (e) {
    console.error(`❌ Failed: ${e.message}`);
  }
}

main().catch(console.error);
