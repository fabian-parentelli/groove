import { apiFetch } from "../apiFetch.api.js";

const postCategoryApi = async (category) => {
    
    return await apiFetch('/api/category', {
        method: 'post',
        body: JSON.stringify(category)
    });

};

export { postCategoryApi };