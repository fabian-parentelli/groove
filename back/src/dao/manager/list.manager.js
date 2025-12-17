import { listModel } from '../models/list.model.js';

export default class Musci {

    postList = async (list) => {
        return await listModel.create(list);
    };

};