import { musicModel } from '../models/music.model.js';

export default class Music {

    postMany = async (songs) => {
        const ops = songs
            .filter(s => s.yid)
            .map(s => ({
                updateOne: { filter: { yid: s.yid }, update: { $setOnInsert: s }, upsert: true }
            }));
        return await musicModel.bulkWrite(ops);
    };

    getAll = async (query = {}) => {
        return await musicModel.find(query).lean();
    };

    getMusic = async (query, page, limit) => {
        return await musicModel.paginate(query, { page, limit, lean: true });
    };

};