import { apiFetch } from '../apiFetch.api.js';

const putListImgApi = async (formData) => {

    return await apiFetch('/api/list/img', {
        method: 'PUT',
        body: formData,
    }, true);

};

export { putListImgApi };
