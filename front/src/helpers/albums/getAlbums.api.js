import { apiFetch } from "../apiFetch.api.js";

const getAlbumsApi = async (obj = {}) => {

    let urlData = '/api/album?';

    if (obj.page) urlData += `page=${obj.page}&`;
    if (obj.limit) urlData += `limit=${obj.limit}&`;

    if (obj.active !== undefined) urlData += `active=${obj.active}&`;

    if (urlData.endsWith('&')) urlData = urlData.slice(0, -1);

    return await apiFetch(urlData, {
        method: 'GET',
    });
};

export { getAlbumsApi };