import { apiFetch } from '../apiFetch.api.js';

const deleteListApi = async (data) => {

    return await apiFetch('/api/list', {
        method: 'DELETE',
        body: JSON.stringify(data),
    });

};

export { deleteListApi };
