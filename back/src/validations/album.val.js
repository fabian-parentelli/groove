import { CustomNotFound } from '../utils/custom-exceptions.utils.js'
import { isValidObjectId } from './validations.val.js';

const getAlbums = (query) => {

    const queries = ['page', 'limit', 'yid', 'author'];

    Object.keys(query).forEach(key => {
        if (!queries.includes(key)) {
            throw new CustomNotFound(`Parámetro no permitido: ${key}`, 'info');
        };
    });

    if (query.page !== undefined && Number(query.page) < 0) {
        throw new CustomNotFound(`El parámetro "page" debe ser 0 o mayor`, 'info');
    };

    if (query.limit !== undefined && Number(query.limit) < 0) {
        throw new CustomNotFound(`El parámetro "limit" debe ser 0 o mayor`, 'info');
    };

    return query;
};

const getById = (params) => {

    const keys = Object.keys(params);
    if (keys.length !== 1 || keys[0] !== 'id') {
        throw new CustomNotFound('El objeto params invadido', 'info');
    };

    if (!params.id) {
        throw new CustomNotFound('El objeto params no contiene un id', 'info');
    };

    if (!isValidObjectId(params.id)) {
        throw new CustomNotFound('El id no es válido', 'info');
    };

    return params;
};

const putAlbum = (body) => {

    const allowed = ['_id', 'name', 'list', 'img', 'likes', 'uid', 'originUrl', 'active', 'author', '__v', 'id'];

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

    if (!Array.isArray(body.list)) {
        throw new CustomNotFound('El campo "list" debe ser un arreglo', 'info');
    };

    if (typeof body.img !== 'string' || body.img.trim().length === 0) {
        throw new CustomNotFound('El campo "img" debe ser un string no vacío', 'info');
    };

    if (!Array.isArray(body.likes)) {
        throw new CustomNotFound('El campo "likes" debe ser un arreglo', 'info');
    };

    if (typeof body.uid !== 'string') {
        throw new CustomNotFound('El campo "uid" debe ser un string', 'info');
    };

    if (typeof body.originUrl !== 'string') {
        throw new CustomNotFound('El campo "originUrl" debe ser un string', 'info');
    };

    if (typeof body.active !== 'boolean') {
        throw new CustomNotFound('El campo "active" debe ser un booleano', 'info');
    };

    if (typeof body.author !== 'string' || body.author.trim().length === 0) {
        throw new CustomNotFound('El campo "author" debe ser un string no vacío', 'info');
    };

    return {
        _id: body._id,
        name: body.name.trim(),
        list: body.list,
        img: body.img.trim(),
        likes: body.likes,
        uid: body.uid,
        originUrl: body.originUrl,
        active: body.active,
        author: body.author.trim()
    };
};


export const validation = {
    getAlbums,
    getById,
    putAlbum
};