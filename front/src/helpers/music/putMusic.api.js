import { apiFetch } from '../apiFetch.api.js';

const putMusicApi = async (music) => {

    return await apiFetch('/api/music', {
        method: 'PUT',
        body: JSON.stringify(music),
    });

};

export { putMusicApi };