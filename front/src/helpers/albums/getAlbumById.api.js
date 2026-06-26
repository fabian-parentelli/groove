import { apiFetch } from '../apiFetch.api.js';

const getAlbumByIdApi = async (id) => {

    return await apiFetch(`/api/album/${id}`, {
        method: 'GET',
    });

};

export { getAlbumByIdApi };