import { apiFetch } from '../apiFetch.api.js';

const putListDelSongApi = async (data) => {

    return await apiFetch('/api/list/del-song', {
        method: 'PUT',
        body: JSON.stringify(data),
    });

};

export { putListDelSongApi };
