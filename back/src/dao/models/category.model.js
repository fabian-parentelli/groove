import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const categoryCollection = 'categories';

const categorySchema = new mongoose.Schema({
    name: { type: String },
    topic: { type: String },
    amount: { type: Number, default: 0 },
    img: { type: String },
    active: { type: Boolean, default: true }
});

categorySchema.plugin(mongoosePaginate);

export const categoryModel = mongoose.model(categoryCollection, categorySchema);