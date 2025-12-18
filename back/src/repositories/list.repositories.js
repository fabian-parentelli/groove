import { listManager } from '../dao/manager/index.manager.js';

export default class ListRepository {

    postList = async (songs) => {
        const result = await listManager.postList(songs);
        return result;
    };
   
    getLists = async (query, page, limit) => {
        const result = await listManager.getLists(query, page, limit);
        return result;
    };

    getById = async (id) => {
        const result = await listManager.getById(id);
        return result;
    };

};