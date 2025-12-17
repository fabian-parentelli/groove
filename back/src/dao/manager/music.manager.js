import { musicModel } from '../models/music.model.js';

export default class Music {

    postMany = async (songs) => {
        const validSongs = songs.filter(s => s.yid);
        return await musicModel.insertMany(validSongs, { ordered: false });
    };

    getAll = async () => {
        return await musicModel.find().lean();
    };
};