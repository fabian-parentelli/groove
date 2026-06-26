import multer from 'multer';

const storage = multer.memoryStorage();

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Formato no permitido. Solo se aceptan imágenes."));
        }
    },
    onError: (err, next) => {
        console.log(err);
        next();
    }
});

const singleUploader = uploader.single('image');

const conditionalUploader = (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (contentType.includes('multipart/form-data')) {
        singleUploader(req, res, (err) => {
            if (err) return next(err);
            if (req.body && Object.getPrototypeOf(req.body) === null) req.body = { ...req.body };
            next();
        });
    } else next();
};

export { singleUploader, conditionalUploader };