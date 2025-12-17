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

export { postMusicVal };