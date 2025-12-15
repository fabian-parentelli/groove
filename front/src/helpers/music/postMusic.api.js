import { apiFetch } from '../apiFetch.api.js';

const postMusicApi = async (music) => {

    return await apiFetch('/api/music', {
        method: 'POST',
        body: JSON.stringify(music),
    });

};

export { postMusicApi };