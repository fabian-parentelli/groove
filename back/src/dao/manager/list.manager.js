import { listModel } from '../models/list.model.js';

export default class Musci {

    postList = async (list) => {
        return await listModel.create(list);
    };

    getLists = async (query, page, limit) => {
        return await listModel.paginate(query, { page, limit, lean: true });
    };

    getById = async (id) => {
        return await listModel.findById(id).lean();
    };

    getMany = async (query, get = {}) => {
        return await listModel.find(query, get).lean();
    };

    update = async (list) => {
        return await listModel.findByIdAndUpdate(list._id, list, { lean: true, new: true });
    };

};