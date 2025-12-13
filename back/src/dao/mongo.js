import mongoose from "mongoose";
import env from '../config/env.config.js';

export default async function mongoDB() {
    console.log('mongo conect ...');
    mongoose.connect(env.mongoDB);
};