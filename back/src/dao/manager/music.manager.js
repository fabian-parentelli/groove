import { musicModel } from '../models/music.model.js';

export default class Musci {

    postMany = async (songs) => {
        const validSongs = songs.filter(s => s.yid);
        return await musicModel.insertMany(validSongs, { ordered: false });
    };

};