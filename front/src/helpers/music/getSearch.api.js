import { apiFetch } from '../apiFetch.api.js';

const getMusicSearchApi = async (id) => {

    return await apiFetch(`/api/music/${id}`, {
        method: 'GET',
    });

};

export { getMusicSearchApi };