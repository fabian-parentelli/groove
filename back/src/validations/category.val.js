import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { isValidObjectId } from "./validations.val.js";

const putCategory = (body) => {

    const allowed = ['_id', 'name', 'amount', 'active', 'topic', 'img', '__v'];

    Object.keys(body).forEach(key => {
        if (!allowed.includes(key)) {
            throw new CustomNotFound(`Parámetro no permitido: ${key}`, 'info');
        };
    });

    allowed.forEach(key => {
        if (body[key] === undefined || body[key] === null) {
            throw new CustomNotFound(`El campo "${key}" es requerido`, 'info');
        };
    });

    if (!isValidObjectId(body._id)) {
        throw new CustomNotFound('El _id no es un ObjectId válido', 'info');
    };

    if (typeof body.name !== 'string' || body.name.trim().length === 0) {
        throw new CustomNotFound('El campo "name" debe ser un string no vacío', 'info');
    };

    if (typeof body.amount !== 'number' || body.amount < 0) {
        throw new CustomNotFound('El campo "amount" debe ser un número mayor o igual a 0', 'info');
    };

    if (typeof body.active !== 'boolean') {
        throw new CustomNotFound('El campo "active" debe ser un booleano', 'info');
    };

    if (typeof body.topic !== 'string' || body.topic.trim().length === 0) {
        throw new CustomNotFound('El campo "topic" debe ser un string no vacío', 'info');
    };

    if (typeof body.img !== 'string' || body.img.trim().length === 0) {
        throw new CustomNotFound('El campo "img" debe ser un string no vacío', 'info');
    };

    return {
        _id: body._id, name: body.name.trim(), amount: body.amount, active: body.active, topic: body.topic.trim(),
        img: body.img.trim()
    };
};

const validation = {
    putCategory
};

export { validation };