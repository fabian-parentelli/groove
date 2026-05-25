import { CustomNotFound } from '../utils/custom-exceptions.utils.js'
import { isValidObjectId } from './validations.val.js';

const getAlbums = (query) => {

    const queries = ['page', 'limit'];

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


export const validation = {
    getAlbums,
    getById
};