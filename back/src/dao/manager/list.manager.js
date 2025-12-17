import { listModel } from '../models/list.model.js';

export default class Musci {

    postList = async (list) => {
        return await listModel.create(list);
    };

    getLists = async (query, page, limit) => {
        return await listModel.paginate(query, { page, limit, lean: true });
    };

};