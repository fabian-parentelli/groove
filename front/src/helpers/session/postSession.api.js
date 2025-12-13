import { apiFetch } from '../apiFetch.api.js';

const postSessionApi = async (user) => {

    return await apiFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user),
    });

};

export { postSessionApi };