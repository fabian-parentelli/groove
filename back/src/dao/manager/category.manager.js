import { categoryModel } from '../models/category.model.js';

export default class Category {

    postCategory = async (category) => {
        return await categoryModel.create(category);
    };

    postMany = async (categories) => {
        return await categoryModel.insertMany(categories);
    };

    getCategory = async (query, get) => {
        return await categoryModel.findOne(query, get).lean();
    };

    getById = async (id) => {
        return await categoryModel.findById(id).lean();
    };

    getAll = async (query, limit) => {
        return await categoryModel.find(query).sort({ _id: -1 }).limit(limit).lean();
    };

    update = async (category) => {
        return await categoryModel.findByIdAndUpdate(category._id, category, { returnDocument: 'after' }).lean();
    };

    updManyAmount = async (categories) => {
        await categoryModel.bulkWrite(
            categories.map(u => ({
                updateOne: {
                    filter: { _id: u._id },
                    update: { $set: { amount: u.amount } }
                }
            })), { ordered: false }
        );
    };

};