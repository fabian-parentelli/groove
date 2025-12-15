import { apiFetch } from "../apiFetch.api.js";

const currentApi = async () => {
    
    return await apiFetch('/api/session/current', {
        method: 'GET',
    });
};

export { currentApi };