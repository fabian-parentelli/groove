import { apiFetch } from "../apiFetch.api.js";

const getCategoriesApi = async () => {
    
    return await apiFetch('/api/category', {
        method: 'get'
    });

};

export { getCategoriesApi };