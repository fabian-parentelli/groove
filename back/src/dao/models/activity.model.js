import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const activityCollection = 'activities';

const activitySchema = new mongoose.Schema({
    eid: { type: String },
    uid: { type: String, index: true },
    type: { type: String },
    date: { type: Date, default: Date.now },
});

activitySchema.plugin(mongoosePaginate);

export const activityModel = mongoose.model(activityCollection, activitySchema);