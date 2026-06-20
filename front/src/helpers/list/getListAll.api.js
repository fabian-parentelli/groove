import { apiFetch } from '../apiFetch.api.js';

const getListsAllApi = async () => {

    return await apiFetch('/api/list/all', {
        method: 'GET',
    });

};

export { getListsAllApi };