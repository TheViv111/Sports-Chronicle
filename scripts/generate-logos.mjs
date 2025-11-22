import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFile = join(__dirname, '../src/assets/logo.png');
const outputDir = join(__dirname, '../public');

const sizes = [
    { size: 40, name: 'logo-40.png' },
    { size: 80, name: 'logo-80.png' },
    { size: 160, name: 'logo-160.png' }
];

async function generateLogos() {
    try {
        for (const { size, name } of sizes) {
            await sharp(inputFile)
                .resize(size, size, {
                    fit: 'cover',
                    position: 'center'
                })
                .png({ quality: 90, compressionLevel: 9 })
                .toFile(join(outputDir, name));

            console.log(`✅ Generated ${name} (${size}x${size}px)`);
        }
        console.log('\n🎉 All logo sizes generated successfully!');
    } catch (error) {
        console.error('❌ Error generating logos:', error);
    }
}

generateLogos();
