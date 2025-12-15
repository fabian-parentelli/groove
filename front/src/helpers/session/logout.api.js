import { apiFetch } from "../apiFetch.api.js";

const logoutApi = async () => {
    
    return await apiFetch('/api/session/logout', {
        method: 'POST'
    });
};

export { logoutApi };