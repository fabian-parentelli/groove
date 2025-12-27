import { CustomNotFound } from "../custom-exceptions.utils.js";
import { isMongoId } from "./validates.js";

const postMusicVal = (body, user) => {

    const errors = [];
    if (!isMongoId(user._id)) throw new CustomNotFound('Id del usuario no es válido');

    ['path', 'type'].forEach(field => {
        if (body[field] === undefined || body[field] === null || body[field] === '') {
            errors.push(`El campo ${field} es obligatorio`);
        };
    });

    Object.keys(body).forEach(key => {
        if (!['path', 'type', 'name'].includes(key)) {
            errors.push(`Campo no permitido: ${key}`);
        };
    });

    if (errors.length) throw new CustomNotFound(errors.join(', '));
};

const putMusicVal = (body, user) => {

    if (!user._id) throw new CustomNotFound('No autorizado');

    const ALLOWED_FIELDS = [
        { k: '_id', t: 'string', r: true },
        { k: 'yid', t: 'string', r: true },
        { k: 'title', t: 'string', r: true, clean: true },
        { k: 'author', t: 'string', r: false, clean: true },
        { k: 'img', t: 'string', r: true },
        { k: 'topics', t: 'array', r: true },
        { k: 'duration', t: 'number', r: true, min: 1 },
        { k: 'active', t: 'boolean', r: true }
    ];

    return ALLOWED_FIELDS.reduce((acc, field) => {
        const val = body[field.k];
        if (val === undefined) {
            if (field.r) throw new Error(`${field.k} es obligatorio`);
            return acc;
        };

        if ((field.t === 'string' && typeof val !== 'string') ||
            (field.t === 'number' && (typeof val !== 'number' || (field.min && val < field.min))) ||
            (field.t === 'boolean' && typeof val !== 'boolean') ||
            (field.t === 'array' && !Array.isArray(val))) throw new Error(`${field.k} inválido`);
        acc[field.k] = field.clean ? cleanString(val) : val;
        
        return acc;
    }, {});
};

export { postMusicVal, putMusicVal };

function cleanString(v) {
    return typeof v === 'string' ? v.trim().replace(/\s+/g, ' ') : v;
};