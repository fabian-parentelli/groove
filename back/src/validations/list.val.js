import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { normalize, isValidObjectId } from './validations.val.js';

const postList = (body) => {

    const allowed = ['name'];

    Object.keys(body).forEach(key => {
        if (!allowed.includes(key)) {
            throw new CustomNotFound(`Parámetro no permitido: ${key}`, 'info');
        };
    });

    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
        throw new CustomNotFound('El campo "name" debe ser un string no vacío', 'info');
    };

    return normalize(body.name);
};

const putAddSong = (body) => {

    const allowed = ['_id', 'yid'];

    Object.keys(body).forEach(key => {
        if (!allowed.includes(key)) {
            throw new CustomNotFound(`Parámetro no permitido: ${key}`, 'info');
        };
    });

    if (!body._id || !isValidObjectId(body._id)) {
        throw new CustomNotFound('El _id no es válido', 'info');
    };

    return {
        _id: body._id.trim(),
        yid: body.yid.trim()
    };
};

const putDelSong = (body) => {

    const allowed = ['_id', 'yid'];

    Object.keys(body).forEach(key => {
        if (!allowed.includes(key)) {
            throw new CustomNotFound(`Parámetro no permitido: ${key}`, 'info');
        };
    });

    if (!body._id || !isValidObjectId(body._id)) {
        throw new CustomNotFound('El _id no es válido', 'info');
    };

    return {
        _id: body._id.trim(),
        yid: body.yid.trim()
    };
};

const deleteList = (body) => {

    const allowed = ['_id'];

    Object.keys(body).forEach(key => {
        if (!allowed.includes(key)) {
            throw new CustomNotFound(`Parámetro no permitido: ${key}`, 'info');
        };
    });

    if (!body._id || !isValidObjectId(body._id)) {
        throw new CustomNotFound('El _id no es válido', 'info');
    };

    return { _id: body._id.trim() };
};

const putImg = (body) => {

    const allowed = ['_id', 'name'];

    Object.keys(body).forEach(key => {
        if (!allowed.includes(key)) {
            throw new CustomNotFound(`Parámetro no permitido: ${key}`, 'info');
        };
    });

    if (!body._id || !isValidObjectId(body._id)) {
        throw new CustomNotFound('El _id no es válido', 'info');
    };

    const result = { _id: body._id.trim() };

    if (body.name) {
        if (typeof body.name !== 'string' || body.name.trim().length === 0) {
            throw new CustomNotFound('El campo "name" debe ser un string no vacío', 'info');
        };
        result.name = normalize(body.name);
    };

    return result;
};

export const validation = {
    postList,
    putAddSong,
    putDelSong,
    deleteList,
    putImg
};
