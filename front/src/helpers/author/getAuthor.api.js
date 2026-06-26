import { apiFetch } from '../apiFetch.api.js';

const getAuthorApi = async (name) => {

    return await apiFetch(`/api/author/${name}`, {
        method: 'GET',
    });

};

export { getAuthorApi };