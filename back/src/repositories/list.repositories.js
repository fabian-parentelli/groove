import { listManager } from '../dao/manager/index.manager.js';

export default class ListRepository {

    postList = async (list) => {
        const result = await listManager.postList(list);
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

    getMany = async (query, get) => {
        const result = await listManager.getMany(query, get);
        return result;
    };
    
    update = async (list) => {
        const result = await listManager.update(list);
        return result;
    };

    delete = async (id) => {
        const result = await listManager.delete(id);
        return result;
    };

};