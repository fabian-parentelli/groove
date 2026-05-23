import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const albumCollection = 'albums';

const albumSchema = new mongoose.Schema({
    name: { type: String },
    list: [{ type: String }],
    img: { type: String },
    likes: [{ type: String }],
    uid: { type: String },
    originUrl: { type: String },
    active: { type: Boolean, default: true },
    author: { type: String }
});

albumSchema.plugin(mongoosePaginate);

export const albumModel = mongoose.model(albumCollection, albumSchema);