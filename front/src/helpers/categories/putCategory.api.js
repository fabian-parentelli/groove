import { apiFetch } from "../apiFetch.api.js";

const putCategoryApi = async (category) => {
    
    return await apiFetch('/api/category', {
        method: 'PUT',
        body: JSON.stringify(category)
    });

};

export { putCategoryApi };