import { CustomNotFound } from '../utils/custom-exceptions.utils.js'

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

export const validation = {
    getAlbums
};