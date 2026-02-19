const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = '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';

const outputDir = path.join(__dirname, 'images', 'branding', 'icon-only');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const bannerPrompt = `Create a professional website hero banner (1920x400 pixels landscape) for "Same Day JetWash" pressure washing company.

PRIMARY FOCUS: Company name with subtle accent imagery

MAIN ELEMENT - TEXT (70% of banner):
- Large, bold, professional text: "SAME DAY JETWASH"
- Center or center-left positioned
- Navy blue (#003D7A) text
- Modern, clean sans-serif font
- High readability and impact
- Professional corporate style
- Text is the hero element

SUBTLE ACCENT IMAGERY (30%):
- Small, subtle water spray element
- Position on left side or behind/around text
- Matching the circular logo style
- Navy blue nozzle with cyan spray accent
- SUBTLE - not competing with text
- Decorative element only
- Thin cyan water streams
- Small water droplets in cyan/white
- Minimal, elegant, professional

BACKGROUND:
- Clean white background
- Very subtle light blue gradient (optional)
- Professional, minimal
- Lets text stand out clearly

COLOR PALETTE:
- Navy blue: #003D7A (main text, nozzle)
- Electric cyan: #00DDFF (subtle water spray accent)
- White: background, highlights
- Light blue: #0091EA (very subtle accents)

STYLE REQUIREMENTS:
- Text-first design (company name is primary)
- Logo imagery is SUBTLE decorative accent
- Professional corporate aesthetic
- Clean, modern, trustworthy
- Not cartoonish
- High-end service company
- 1920x400 pixels landscape
- Similar style to icon logo but text-focused`;

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
        'X-Title': 'JetWash V1 Banner With Text'
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
  console.log('💧 Same Day JetWash - V1 Banner WITH TEXT');
  console.log('=========================================');
  console.log(`Output directory: ${outputDir}\n`);
  console.log('🎨 Generating banner with "Same Day JetWash" text...\n');

  try {
    await generateImage(bannerPrompt, 'banner-v1-with-text-1920x400');
    console.log('\n=========================================');
    console.log('✨ Complete! Banner with text generated.');
    console.log(`\nFile: ${outputDir}/banner-v1-with-text-1920x400.png`);
  } catch (e) {
    console.error(`❌ Failed: ${e.message}`);
  }
}

main().catch(console.error);
