import { apiFetch } from "../apiFetch.api.js";

const getListApi = async (obj) => {

    let urlData = '/api/list?';

    if (obj.page) urlData += `page=${obj.page}&`;
    if (obj.limit) urlData += `limit=${obj.limit}&`;
    if (obj.id) urlData += `id=${obj.id}&`;
    if (obj.uid) urlData += `uid=${obj.uid}&`;
    if (obj.active !== undefined) urlData += `active=${obj.active}&`;

    if (urlData.endsWith('&')) urlData = urlData.slice(0, -1);

    return await apiFetch(urlData, {
        method: 'GET',
    });
};

export { getListApi };