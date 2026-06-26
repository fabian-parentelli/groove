import { apiFetch } from '../apiFetch.api.js';

const putListApi = async (music) => {

    return await apiFetch('/api/list', {
        method: 'PUT',
        body: JSON.stringify(music),
    });

};

export { putListApi };