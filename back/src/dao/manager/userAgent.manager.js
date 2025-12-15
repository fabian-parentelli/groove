import { userAgentModel } from '../models/userAgent.model.js';

export default class UserAgent {

    postUserAgent = async (ua) => {
        return await userAgentModel.create(ua);
    };

    getOne = async (query, get = {}) => {
        return await userAgentModel.findOne(query, get).lean();
    };

    update = async (userAgent) => {
        await userAgentModel.findByIdAndUpdate(userAgent._id, userAgent);
    };

};