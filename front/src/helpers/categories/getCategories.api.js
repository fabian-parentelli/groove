import { apiFetch } from "../apiFetch.api.js";

const getCategoriesApi = async (obj = {}) => {

    let urlData = '/api/category?';

    if (obj.page) urlData += `page=${obj.page}&`;
    if (obj.limit) urlData += `limit=${obj.limit}&`;
    if (obj.names) urlData += `names=${obj.names}&`;

    if (urlData.endsWith('&')) urlData = urlData.slice(0, -1);

    return await apiFetch(urlData, {
        method: 'GET'
    });

};

export { getCategoriesApi };