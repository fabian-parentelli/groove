import { userModel } from '../models/user.model.js';

export default class User {

    postUser = async (user) => {
        return await userModel.create(user);
    };

    getOne = async (query, get = {}) => {
        return await userModel.findOne(query, get).lean();
    };

    getById = async (id) => {
        return await userModel.findById(id).lean();
    };

    updateOne = async (_id, upd = {}) => {
       return await userModel.updateOne({ _id }, { $set: upd });
    };

    // update = async (user, route) => {
    //     try {
    //         return await this.modelMap[route].findByIdAndUpdate(user._id, user, { lean: true, new: true });
    //     } catch (error) {
    //         logger({ error, route: 'model/ms_users', user: user._id || null });
    //         return null;
    //     };
    // };

};