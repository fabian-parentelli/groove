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

    getSearch = async (topics) => {
        return await musicModel.aggregate([
            { $match: { topics: { $in: topics }, active: true } },
            { $sample: { size: 50 } }
        ]);
    };

    getOne = async (query, get) => {
        return await musicModel.findOne(query, get).lean();
    };

    getById = async (id) => {
        return await musicModel.findById(id).lean();
    };

    getMusic = async (query, page, limit) => {
        return await musicModel.paginate(query, { page, limit, lean: true, sort: { _id: -1 } });
    };

    getRandom = async (query, limit = 24) => {
        return await musicModel.aggregate([{ $match: query }, { $sample: { size: +limit } }]);
    };

    update = async (song) => {
        return await musicModel.findByIdAndUpdate(song._id, song, { lean: true, new: true });
    };

};