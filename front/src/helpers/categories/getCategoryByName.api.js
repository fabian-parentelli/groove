import { apiFetch } from "../apiFetch.api.js";

const getCategoryByNameApi = async (name) => {
    
    return await apiFetch(`/api/category/${name}`, {
        method: 'GET'
    });

};

export { getCategoryByNameApi };