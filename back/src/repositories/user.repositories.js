import { userManager } from '../dao/manager/index.manager.js';

export default class UserRepository {

    getById = async (id) => {
        const result = await userManager.getById(id);
        return result;
    };

};