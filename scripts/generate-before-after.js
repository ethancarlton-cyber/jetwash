const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = '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';

const outputDir = path.join(__dirname, '..', 'images', 'before-after');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// High-quality before/after images using Nano Banana Pro
const prompts = [
  {
    name: 'driveway-before-after',
    prompt: `Create a photorealistic before and after comparison image of driveway pressure washing.

COMPOSITION:
- Split image: left side BEFORE, right side AFTER
- Clear vertical dividing line in the center
- Same exact driveway from same angle in both halves

BEFORE (Left Side):
- Block paving driveway covered in black algae and moss
- Green slime between pavers
- Weeds growing through joints
- Oil stains visible near where car parks
- Overall grey/green/dirty appearance
- Typical neglected UK driveway look

AFTER (Right Side):
- Same driveway, professionally pressure washed
- Original red/charcoal block paving colors restored
- Clean joints with fresh kiln-dried sand
- No weeds, moss, or algae
- Looks like new installation
- Vibrant, clean appearance

SETTING:
- British suburban home (red brick, Surrey style)
- Driveway in front of house
- Natural daylight
- Realistic UK weather/lighting

STYLE:
- Photorealistic, professional photography quality
- 16:9 landscape aspect ratio
- High detail, sharp focus
- NO text, logos, or watermarks`
  },
  {
    name: 'patio-before-after',
    prompt: `Create a photorealistic before and after comparison image of patio cleaning.

COMPOSITION:
- Split image: left side BEFORE, right side AFTER
- Clear vertical dividing line
- Same patio from identical angle

BEFORE (Left Side):
- Indian sandstone patio covered in black spots (lichen)
- Thick green algae making surface slippery
- Discolored flagstones
- Pointing deteriorating with moss
- Dangerous, neglected appearance

AFTER (Right Side):
- Same patio after professional soft washing
- Beautiful warm sandstone colors restored
- Clean, safe non-slip surface
- Fresh appearance
- Looks like newly laid patio

SETTING:
- British back garden
- Garden furniture nearby (table, chairs)
- Lawn and flower beds visible
- Summer afternoon lighting
- Typical Surrey/UK garden

STYLE:
- Photorealistic
- Professional before/after comparison
- Landscape 16:9 format
- High quality, sharp details
- NO text or watermarks`
  },
  {
    name: 'render-before-after',
    prompt: `Create a photorealistic before and after comparison of house render cleaning.

COMPOSITION:
- Split image: left BEFORE, right AFTER
- Same house wall section, same angle
- Vertical dividing line in center

BEFORE (Left Side):
- White/cream rendered house wall
- Heavy green algae streaks running down
- Black pollution staining
- Red/orange lichen patches
- Looks old and neglected

AFTER (Right Side):
- Same render after soft washing
- Brilliant white/cream color restored
- Clean, bright appearance
- Like freshly painted
- Modern, well-maintained look

SETTING:
- Modern British house exterior
- Front or side of property
- Windows visible for scale
- Surrey suburban property style
- Overcast UK daylight

STYLE:
- Photorealistic
- Professional comparison shot
- Landscape format
- High detail
- NO text or logos`
  },
  {
    name: 'decking-before-after',
    prompt: `Create a photorealistic before and after comparison of wooden decking cleaning.

COMPOSITION:
- Split image: left BEFORE, right AFTER
- Same decking area from same viewpoint
- Clear vertical divide

BEFORE (Left Side):
- Grey, weathered wooden deck
- Thick green algae coating (slippery hazard)
- Black mold in wood grain
- Dangerous appearance
- Wood looks rotten/old

AFTER (Right Side):
- Same decking after pressure washing
- Natural warm wood color restored
- Beautiful honey/brown wood grain visible
- Safe, clean non-slip surface
- Looks like new decking

SETTING:
- British back garden
- Decking with steps down to lawn
- Garden plants around edges
- Outdoor furniture on decking
- Pleasant summer day

STYLE:
- Photorealistic photography
- Professional before/after
- 16:9 landscape
- Crisp, detailed
- NO text`
  },
  {
    name: 'block-paving-before-after',
    prompt: `Create a photorealistic before and after of block paving being pressure washed.

COMPOSITION:
- Split view: BEFORE on left, AFTER on right
- Herringbone pattern block paving
- Same section of driveway

BEFORE (Left Side):
- Block paving with weeds everywhere
- Moss filling all the joints
- Black organic growth on surface
- Faded, dirty appearance
- Colors barely visible under grime

AFTER (Right Side):
- Same blocks professionally cleaned
- Sharp, defined edges visible
- Original red and charcoal colors pop
- Clean joints ready for re-sanding
- Looks brand new

SETTING:
- Close-up view of block paving
- UK residential driveway
- Natural daylight
- Detailed texture visible

STYLE:
- Photorealistic close-up
- Before/after comparison
- High detail showing texture
- Landscape format
- NO text or watermarks`
  }
];

async function generateImage(prompt, name) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: 'google/gemini-2.5-flash-image',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const options = {
      hostname: 'openrouter.ai',
      port: 443,
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://jetwash-psi.vercel.app',
        'X-Title': 'JetWash Before/After Generator'
      }
    };

    console.log(`\n🎨 Generating with Nano Banana: ${name}...`);

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
          if (!message) {
            console.log('Response:', JSON.stringify(response, null, 2).substring(0, 1000));
            reject(new Error('No message in response'));
            return;
          }

          // Check for images in various locations
          let imageData = null;

          if (message.images && message.images.length > 0) {
            imageData = message.images[0];
          } else if (message.content && Array.isArray(message.content)) {
            const imageContent = message.content.find(c => c.type === 'image' || c.type === 'image_url');
            if (imageContent) {
              imageData = imageContent;
            }
          }

          if (!imageData) {
            console.log('Full response:', JSON.stringify(response, null, 2).substring(0, 1000));
            reject(new Error('No image data in response - model may not support image generation'));
            return;
          }

          // Extract base64 data
          let base64Data = null;

          if (imageData.image_url?.url) {
            base64Data = imageData.image_url.url.replace(/^data:image\/\w+;base64,/, '');
          } else if (typeof imageData === 'string') {
            base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
          } else if (imageData.data) {
            base64Data = imageData.data;
          }

          if (!base64Data) {
            reject(new Error('Could not extract image data'));
            return;
          }

          const buffer = Buffer.from(base64Data, 'base64');
          const filePath = path.join(outputDir, `${name}.png`);
          fs.writeFileSync(filePath, buffer);
          console.log(`✅ Saved: ${filePath}`);
          resolve(filePath);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => reject(new Error(`Request error for ${name}: ${e.message}`)));
    req.setTimeout(180000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🍌 JetWash Before/After Generator (Nano Banana Pro)');
  console.log('====================================================\n');
  console.log(`Output directory: ${outputDir}`);
  console.log(`Total images to generate: ${prompts.length}\n`);

  let success = 0;
  let failed = 0;

  for (const item of prompts) {
    try {
      await generateImage(item.prompt, item.name);
      success++;
      // Delay between requests
      await new Promise(r => setTimeout(r, 5000));
    } catch (error) {
      console.error(`❌ Failed: ${item.name} - ${error.message}`);
      failed++;
    }
  }

  console.log('\n====================================================');
  console.log(`✅ Success: ${success}/${prompts.length}`);
  console.log(`❌ Failed: ${failed}/${prompts.length}`);
  console.log('\nDone!');
}

main().catch(console.error);
