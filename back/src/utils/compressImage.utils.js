import sharp from 'sharp';

const compressImage = async (buffer) => {
    
    return await sharp(buffer)
        .resize({ 
            width: 1583, 
            withoutEnlargement: true
        })
        .webp({ 
            quality: 75,
            effort: 6,
            lossless: false
        })
        .toBuffer();
};

export { compressImage };