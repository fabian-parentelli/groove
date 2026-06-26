import { categoryManager } from '../dao/manager/index.manager.js';

export default class CategoryRepository {

    postCategory = async (category) => {
        const result = await categoryManager.postCategory(category);
        return result;
    };

    postMany = async (categories) => {
        const result = await categoryManager.postMany(categories);
        return result;
    };

    getCategory = async (query, get = {}) => {
        const result = await categoryManager.getCategory(query, get);
        return result;
    };

    getById = async (id) => {
        const result = await categoryManager.getById(id);
        return result;
    };

    getAll = async (query, limit) => {
        const result = await categoryManager.getAll(query, limit);
        return result;
    };

    update = async (category) => {
        const result = await categoryManager.update(category);
        return result;
    };

    updManyAmount = async (categories) => {
        const result = await categoryManager.updManyAmount(categories);
        return result;
    };

};