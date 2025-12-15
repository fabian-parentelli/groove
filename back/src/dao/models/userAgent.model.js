import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userAgentCollection = 'userAgents';

const userAgentSchema = new mongoose.Schema({
    uid: { type: String, index: true },
    date: { type: Date, default: Date.now },
    browser: { type: String },
    version: { type: String },
    os: { type: String },
    platform: { type: String },
    isMobile: { type: Boolean },
    isTablet: { type: Boolean },
    isDesktop: { type: Boolean },
});

userAgentSchema.plugin(mongoosePaginate);

export const userAgentModel = mongoose.model(userAgentCollection, userAgentSchema);