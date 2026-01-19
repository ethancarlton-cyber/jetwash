const https = require('https');
const fs = require('fs');
const path = require('path');

const OPENROUTER_API_KEY = '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';

const outputDir = path.join(__dirname, '..', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// JetWash Image Prompts
const prompts = [
  // OG Image for social sharing (1200x630)
  {
    name: 'og-image',
    prompt: `Create a professional, eye-catching Open Graph image for a pressure washing business called "Same Day JetWash Reigate".

COMPOSITION:
- Wide format suitable for social media sharing (1200x630 aspect ratio)
- Professional pressure washing scene in suburban UK setting
- Show a clean, freshly washed block paving driveway with visible transformation
- Include subtle water spray effects for dynamic feel

ELEMENTS:
- British residential property in background (brick house, typical Surrey/UK style)
- Professional pressure washing equipment (commercial-grade)
- Clear before/after visual divide (dirty left side, clean right side)
- Natural daylight, pleasant weather

TEXT OVERLAY AREA:
- Leave space on right side for potential text overlay
- Dark gradient area for text visibility

STYLE:
- Photorealistic, high quality
- Professional business imagery
- Trustworthy, clean, modern
- Colors: Blues and greens for freshness, warm tones for welcoming feel
- NO text in the image itself`
  },

  // Hero image for homepage
  {
    name: 'hero-driveway',
    prompt: `Professional photograph of a pressure washing technician cleaning a block paving driveway in a UK suburban setting.

SCENE:
- Worker in professional attire using commercial pressure washer
- Block paving driveway showing dramatic cleaning transformation
- Half cleaned (visible before/after line)
- Spray water creating dynamic effect
- British residential property (red brick house with bay windows)

DETAILS:
- Sunny day in Surrey, England
- Well-maintained garden visible
- Professional equipment clearly visible
- Safety-conscious operation

STYLE:
- Photorealistic, editorial quality
- Warm, inviting lighting
- Professional business photography
- NO text or logos
- Landscape orientation`
  },

  // Driveway cleaning service
  {
    name: 'service-driveway',
    prompt: `Before and after split image of a UK driveway cleaning transformation.

LEFT SIDE (Before):
- Dirty block paving driveway
- Black algae, moss, weeds in joints
- Oil stains visible
- Weathered and neglected appearance

RIGHT SIDE (After):
- Same driveway, professionally cleaned
- Vibrant original colors restored
- Clean joints, no weeds
- Fresh, new appearance

SETTING:
- Typical British suburban home
- Red brick house in background
- Surrey/Kent style property

STYLE:
- Photorealistic comparison shot
- Clear dividing line in center
- Professional quality
- Landscape format
- NO text`
  },

  // Patio cleaning service
  {
    name: 'service-patio',
    prompt: `Before and after split image of a UK patio cleaning transformation.

LEFT SIDE (Before):
- Indian sandstone patio with black spots (lichen)
- Green algae, slippery surface
- Discolored and weathered flagstones

RIGHT SIDE (After):
- Same patio, professionally pressure washed
- Natural stone colors restored
- Clean, safe surface
- Beautiful warm tones visible

SETTING:
- British back garden
- Patio furniture nearby
- Well-maintained garden plants
- Summer daylight

STYLE:
- Photorealistic
- Clear before/after comparison
- Professional editorial quality
- Landscape format
- NO text`
  },

  // Block paving cleaning
  {
    name: 'service-block-paving',
    prompt: `Close-up photograph of block paving being pressure washed, showing the cleaning process.

SCENE:
- Detailed view of block paving being cleaned
- Visible spray pattern from pressure washer nozzle
- Dramatic difference between cleaned and uncleaned sections
- Water splashing and dirty runoff visible

DETAILS:
- Red/charcoal herringbone pattern block paving
- Weed-filled joints being cleared
- Original colors emerging from cleaning
- Professional equipment visible in frame

STYLE:
- Photorealistic, action shot
- Dynamic water effects
- High detail, sharp focus
- Landscape orientation
- NO text`
  },

  // Render cleaning
  {
    name: 'service-render',
    prompt: `Before and after image of external render cleaning on a UK house.

LEFT SIDE (Before):
- White/cream rendered wall with green algae streaks
- Black staining from pollution
- Red/orange lichen patches
- Neglected appearance

RIGHT SIDE (After):
- Same render, professionally soft washed
- Bright white/cream original color restored
- Clean, fresh appearance
- Like-new condition

SETTING:
- Modern British house with rendered exterior
- Typical Surrey suburban property
- Front of house visible

STYLE:
- Photorealistic comparison
- Clear vertical dividing line
- Professional quality
- NO text`
  },

  // Decking cleaning
  {
    name: 'service-decking',
    prompt: `Before and after split image of wooden decking cleaning transformation.

LEFT SIDE (Before):
- Grey, weathered wooden deck
- Green algae making it slippery
- Black mold in grain
- Dangerous and neglected

RIGHT SIDE (After):
- Same decking, pressure washed
- Natural wood grain visible
- Warm honey/brown tones restored
- Safe, clean surface

SETTING:
- British back garden
- Decking area with steps
- Garden furniture nearby
- Summer setting

STYLE:
- Photorealistic
- Clear comparison
- Professional photography
- Landscape format
- NO text`
  },

  // Commercial jetwashing
  {
    name: 'service-commercial',
    prompt: `Professional photograph of commercial pressure washing at a UK business property.

SCENE:
- Commercial car park being cleaned
- Professional team with industrial equipment
- Large area cleaning operation
- Business premises in background

DETAILS:
- Commercial-grade pressure washing equipment
- Multiple operators working
- Retail/office park setting
- Professional, efficient operation

STYLE:
- Photorealistic business photography
- Editorial quality
- Professional and trustworthy
- Landscape orientation
- NO text or visible business names`
  }
];

async function generateImage(prompt, name) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: 'google/gemini-3-pro-image-preview',
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
        'X-Title': 'JetWash Image Generator'
      }
    };

    console.log(`\n🎨 Generating: ${name}...`);

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
            console.log('Full response:', JSON.stringify(response, null, 2).substring(0, 500));
            reject(new Error('No image data in response'));
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

          // Save as JPG for og-image, PNG for others
          const extension = name === 'og-image' ? 'jpg' : 'png';
          const filePath = path.join(outputDir, `${name}.${extension}`);
          fs.writeFileSync(filePath, buffer);
          console.log(`✅ Saved: ${filePath}`);
          resolve(filePath);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => reject(new Error(`Request error for ${name}: ${e.message}`)));
    req.setTimeout(180000, () => { // 3 minute timeout
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🚀 JetWash Image Generator');
  console.log('==========================\n');
  console.log(`Output directory: ${outputDir}`);
  console.log(`Total images to generate: ${prompts.length}\n`);

  let success = 0;
  let failed = 0;

  for (const item of prompts) {
    try {
      await generateImage(item.prompt, item.name);
      success++;
      // Add delay between requests to avoid rate limiting
      await new Promise(r => setTimeout(r, 3000));
    } catch (error) {
      console.error(`❌ Failed: ${item.name} - ${error.message}`);
      failed++;
    }
  }

  console.log('\n==========================');
  console.log(`✅ Success: ${success}/${prompts.length}`);
  console.log(`❌ Failed: ${failed}/${prompts.length}`);
  console.log('\nDone!');
}

main().catch(console.error);