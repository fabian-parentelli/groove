import { apiFetch } from "../apiFetch.api.js";

const getMusicApi = async (obj) => {

    let urlData = '/api/music?';

    if (obj.page) urlData += `page=${obj.page}&`;
    if (obj.limit) urlData += `limit=${obj.limit}&`;
    if (obj.uid) urlData += `uid=${obj.uid}&`;
    if (obj.lid) urlData += `lid=${obj.lid}&`;
    if (obj.category) urlData += `category=${obj.category}&`;
    if (obj.active !== undefined) urlData += `active=${obj.active}&`;

    if (urlData.endsWith('&')) urlData = urlData.slice(0, -1);

    return await apiFetch(urlData, {
        method: 'GET',
    });
};

export { getMusicApi };