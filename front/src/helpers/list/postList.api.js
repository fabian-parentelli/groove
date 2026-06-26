import { apiFetch } from '../apiFetch.api.js';

const postListApi = async (data) => {

    return await apiFetch('/api/list', {
        method: 'POST',
        body: JSON.stringify(data),
    });

};

export { postListApi };