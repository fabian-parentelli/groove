import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const listCollection = 'lists';

const listSchema = new mongoose.Schema({
    name: { type: String },
    list: [{ type: String }],
    img: { type: String },
    likes: [{ type: String }],
    uid: { type: String },
    originUrl: { type: String },
    active: { type: Boolean, default: true }
});

listSchema.plugin(mongoosePaginate);

export const listModel = mongoose.model(listCollection, listSchema);