import { apiFetch } from '../apiFetch.api.js';

const putAlbumApi = async (album) => {

    return await apiFetch(`/api/album`, {
        method: 'PUT',
        body: JSON.stringify(album)
    });

};

export { putAlbumApi };