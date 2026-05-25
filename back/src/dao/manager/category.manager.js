import { categoryModel } from '../models/category.model.js';

export default class Category {

    postCategory = async (category) => {
        return await categoryModel.create(category);
    };
    
    postMany = async (categories) => {
        return await categoryModel.insertMany(categories);
    };

    getAll = async () => {
        return await categoryModel.find().lean();
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