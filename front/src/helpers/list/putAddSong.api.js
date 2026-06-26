import { apiFetch } from '../apiFetch.api.js';

const putAddSongApi = async (data) => {

    return await apiFetch('/api/list/add-song', {
        method: 'PUT',
        body: JSON.stringify(data),
    });

};

export { putAddSongApi };
