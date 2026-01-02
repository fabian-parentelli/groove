import path from 'path';
import { CustomNotFound } from '../custom-exceptions.utils.js';

const putListVal = (body, user) => {

    if (body.role !== 'admin') {
        if (!body.uid || body.uid !== user._id) {
            throw new CustomNotFound('Usuario no autorizado')
        };
    };

    const requiredFields = ['_id', 'name', 'list', 'likes', 'uid', 'originUrl', 'active'];
    for (const field of requiredFields) {
        if (!(field in body)) {
            throw new CustomNotFound(`Falta el campo: ${field}`)
        };
    };

    body._id = body._id.trim();
    body.name = body.name.trim();
    body.originUrl = body.originUrl.trim();

    if (typeof body._id !== 'string') throw new CustomNotFound('_id debe ser string');
    if (typeof body.name !== 'string') throw new CustomNotFound('name debe ser string');
    if (!Array.isArray(body.list)) throw new CustomNotFound('list debe ser array')
    if (!Array.isArray(body.likes)) throw new CustomNotFound('likes debe ser array');
    if (typeof body.originUrl !== 'string') throw new CustomNotFound('originUrl debe ser string');
    if (typeof body.active !== 'boolean') throw new CustomNotFound('active debe ser boolean');

    if (body.img) {
        const ext = path.extname(body.img).toLowerCase();
        const allowedExt = ['.jpg', '.jpeg', '.png', '.gif'];
        if (!allowedExt.includes(ext)) {
            throw new CustomNotFound('Solo se permiten imágenes');
        };
    };

    return body;
};

export { putListVal };