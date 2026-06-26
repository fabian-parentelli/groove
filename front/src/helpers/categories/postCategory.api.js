import { apiFetch } from "../apiFetch.api.js";

const postCategoryApi = async (category) => {
    
    return await apiFetch('/api/category', {
        method: 'POST',
        body: JSON.stringify(category)
    });

};

export { postCategoryApi };