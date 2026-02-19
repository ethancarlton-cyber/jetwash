const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = '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';

const outputDir = path.join(__dirname, 'images', 'branding');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const brandingAssets = {
  logo: `Create a professional square logo (512x512 pixels) for "Same Day JetWash" - a premium pressure washing and jetwashing service.

DESIGN REQUIREMENTS:
- Clean, modern, professional service company aesthetic
- MUST include subtle water/pressure washing imagery
- Strong, trustworthy brand identity
- Works well at small sizes (favicon) and large sizes

VISUAL ELEMENTS:
- Central icon: Stylized pressure washer nozzle or water spray burst
- Water droplets or cleaning spray pattern
- Clean geometric shapes suggesting precision and professionalism

COLOR SCHEME (Premium Service):
- Primary: Deep professional blue (#0066CC or #003D7A) - trust and reliability
- Accent: Clean aqua/cyan (#00B4D8) - water and freshness
- Highlight: White or light blue for spray/water effects
- Optional: Touch of silver/grey for modern premium feel

COMPOSITION:
- Simple, bold icon that's recognizable at 32x32 pixels
- Balanced, centered design
- Modern sans-serif implied (though no actual text needed)
- Premium service quality aesthetic

STYLE:
- Professional, not cartoonish
- Clean lines and shapes
- High contrast for visibility
- Suggests speed, efficiency, and thoroughness
- Square format (1:1)`,

  banner: `Create a professional website hero banner (1920x400 pixels landscape) for "Same Day JetWash" jetwashing and pressure washing service.

CRITICAL: This MUST match the logo design visually - use the same color scheme and design language!

COLOR SCHEME (MUST MATCH LOGO):
- Primary: Deep professional blue (#0066CC or #003D7A)
- Accent: Clean aqua/cyan (#00B4D8)
- Background: Light gradient from white to very light blue
- Spray effects: White with cyan highlights

COMPOSITION:
- LEFT SIDE (40%): Stylized pressure washer nozzle or cleaning action
  - Dynamic water spray burst in cyan and white
  - Suggests power and effectiveness
  - Matches the logo icon style

- CENTER-RIGHT (60%): Clean service imagery
  - Abstract representation of a clean driveway or patio
  - Before/after suggestion with spray revealing clean surface
  - Professional, premium aesthetic
  - Plenty of clean negative space

VISUAL STYLE:
- Professional service company aesthetic (NOT cartoonish)
- Clean, modern, trustworthy
- Dynamic water spray effects
- Geometric precision suggesting quality work
- Premium residential/commercial service appeal

EFFECTS:
- Water spray particles and droplets
- Cyan energy/motion lines suggesting high pressure
- Clean, fresh atmosphere
- Professional sheen and polish

FORMAT: 1920x400 pixels, wide landscape banner
MOOD: Professional, efficient, trustworthy, premium quality`
};

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
        'X-Title': 'Same Day JetWash Branding'
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
  console.log('💧 Same Day JetWash - Professional Branding Generation');
  console.log('=====================================================');
  console.log(`Output directory: ${outputDir}\n`);

  // Generate logo
  console.log('🎨 Generating logo (512x512)...');
  try {
    await generateImage(brandingAssets.logo, 'logo-512x512');
    console.log('   Logo complete!\n');
  } catch (e) {
    console.error(`   ❌ Logo generation failed: ${e.message}\n`);
  }

  // Wait 3 seconds between requests
  await new Promise(r => setTimeout(r, 3000));

  // Generate banner
  console.log('🎨 Generating hero banner (1920x400)...');
  try {
    await generateImage(brandingAssets.banner, 'hero-banner-1920x400');
    console.log('   Banner complete!\n');
  } catch (e) {
    console.error(`   ❌ Banner generation failed: ${e.message}\n`);
  }

  console.log('=====================================================');
  console.log(`✨ Complete! Check: ${outputDir}`);
  console.log('\nGenerated files:');
  console.log('  - logo-512x512.png (use for favicon, social media)');
  console.log('  - hero-banner-1920x400.png (use for website header)');
}

main().catch(console.error);
