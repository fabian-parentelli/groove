import { categoryManager } from '../dao/manager/index.manager.js';

export default class CategoryRepository {

    postMany = async (categories) => {
        const result = await categoryManager.postMany(categories);
        return result;
    };
    
    getAll = async () => {
        const result = await categoryManager.getAll();
        return result;
    };
    
    updManyAmount = async (categories) => {
        const result = await categoryManager.updManyAmount(categories);
        return result;
    };

};