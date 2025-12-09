const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PHOTOS_DIR = './slrphotos';
const THUMB_WIDTH = 400;
const THUMB_QUALITY = 85;

async function generateThumbnails() {
    console.log('🖼️  Scanning for images that need thumbnails...');
    
    if (!fs.existsSync(PHOTOS_DIR)) {
        console.error(`❌ Error: ${PHOTOS_DIR} directory not found!`);
        process.exit(1);
    }
    
    const files = fs.readdirSync(PHOTOS_DIR);
    const imageFiles = files.filter(f => 
        (f.endsWith('.jpg') || f.endsWith('.JPG')) && 
        !f.includes('thumb') && 
        !f.includes('Thumb')
    );
    
    console.log(`📁 Found ${imageFiles.length} full-size images`);
    
    let generated = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const file of imageFiles) {
        const fullPath = path.join(PHOTOS_DIR, file);
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const thumbPath = path.join(PHOTOS_DIR, `${baseName}.thumb${ext}`);
        
        // Skip if thumbnail already exists
        if (fs.existsSync(thumbPath)) {
            skipped++;
            continue;
        }
        
        try {
            await sharp(fullPath)
                .resize(THUMB_WIDTH, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .jpeg({ quality: THUMB_QUALITY })
                .toFile(thumbPath);
            
            console.log(`✓ Created: ${baseName}.thumb.jpg`);
            generated++;
        } catch (error) {
            console.error(`✗ Failed to process ${file}:`, error.message);
            errors++;
        }
    }
    
    console.log(`\n📊 Complete!`);
    console.log(`   ✓ ${generated} thumbnails created`);
    console.log(`   ⊘ ${skipped} already existed`);
    if (errors > 0) {
        console.log(`   ✗ ${errors} errors`);
    }
}

generateThumbnails().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
