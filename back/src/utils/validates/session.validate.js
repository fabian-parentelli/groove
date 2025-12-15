import { CustomNotFound } from "../custom-exceptions.utils.js";

const sessionPostVal = (body) => {

    const errors = [];
    let requiredFields = [];

    if (body.type === 'register') requiredFields = ['name', 'email', 'password', 'type'];
    if (body.type === 'login') requiredFields = ['email', 'password', 'type'];
    if (body.type === 'password') requiredFields = ['email', 'type'];

    requiredFields.forEach(field => {
        if (body[field] === undefined || body[field] === null || body[field] === '') {
            errors.push(`El campo ${field} es obligatorio`);
        };
    });

    Object.keys(body).forEach(key => {
        if (!requiredFields.includes(key) && key !== 'location') {
            errors.push(`Campo no permitido: ${key}`);
        };
    });

    if (errors.length) throw new CustomNotFound(errors.join(', '));
};

export { sessionPostVal };