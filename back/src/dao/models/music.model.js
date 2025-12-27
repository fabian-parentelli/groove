import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const musicCollection = 'musics';

const musicSchema = new mongoose.Schema({
    yid: { type: String, unique: true, index: true },
    title: { type: String },
    author: { type: String },
    img: { type: String },
    duration: { type: Number },
    topics: [{ type: String }],
    active: { type: Boolean, default: true }
});

musicSchema.plugin(mongoosePaginate);

export const musicModel = mongoose.model(musicCollection, musicSchema);