import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, unique: true },
    
    active: { type: Boolean, default: true },
    role: { type: String, default: 'user' },

    created: { type: Date, default: Date.now },
    lastConnection: { type: Date },
    
    birthday: { type: Date },
    language: { type: String, default: 'es' },
    location: {
        city: { type: String },
        region: { type: String },
        country: { type: String },
        currency: { type: String },
        currencyName: { type: String },
        address: { type: String },
        postalCode: { type: String },
    },
    img: [{ type: String }],
    
    passId: { type: String },
    passDate: { type: Date },
    
    favorites: [{
        id: { type: String },
        type: { type: String }
    }]
});

userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(userCollection, userSchema);