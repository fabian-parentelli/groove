import { compressImage } from '../utils/compressImage.utils.js';
import { v2 as cloudinary } from 'cloudinary';
import env from './env.config.js';

cloudinary.config({
    cloud_name: env.cloudName,
    api_key: env.apiKey,
    api_secret: env.apiSecret
});

const uploadToCloudinary = async (req, res, next) => {

    if (!req.file) {
        req.cloudinaryUrl = null;
        return next();
    }

    const file = req.file;
    const { folderName } = req.body;

    try {
        let fileBuffer = file.buffer;

        if (file.mimetype.startsWith("image/")) {
            fileBuffer = await compressImage(file.buffer);
        }

        const options = {
            folder: folderName,
            resource_type: 'image',
            format: 'webp'
        };

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                options,
                (error, result) => {
                    if (error) {
                        console.error('Error al cargar a Cloudinary:', error);
                        reject(error);
                    } else resolve(result);
                }
            );
            stream.end(fileBuffer);
        });

        req.cloudinaryUrl = result.secure_url;
        next();
    } catch (error) {
        console.error('Error en la subida:', error);
        next(error);
    }
};

const deleteImg = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
};

const getPublicId = (url) => {
    const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/;
    const match = url.match(regex);
    if (match && match[1]) return match[1];
    throw new Error('URL de Cloudinary no válida');
};

export { uploadToCloudinary, deleteImg, getPublicId };