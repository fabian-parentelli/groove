import { musicManager } from '../dao/manager/index.manager.js';

export default class MusicRepository {

    postMany = async (songs) => {
        const result = await musicManager.postMany(songs);
        return result;
    };

    getAll = async (query) => {
        const result = await musicManager.getAll(query);
        return result;
    };

    getSearch = async (topics) => {
        const result = await musicManager.getSearch(topics);
        return result;
    };

    getOne = async (query = {}, get = {}) => {
        const result = await musicManager.getOne(query, get);
        return result;
    };

    getById = async (id) => {
        const result = await musicManager.getById(id);
        return result;
    };

    getMusic = async (query, page, limit) => {
        let result = await musicManager.getMusic(query, page, limit);
        if (query.yid && query.yid['$in']) {
            result.docs = query.yid['$in'].map(id => result.docs.find(d => d.yid === id)).filter(Boolean);
        };
        return result;
    };

    getRandom = async (query, limit) => {
        const result = await musicManager.getRandom(query, limit);
        return result;
    };

    update = async (song) => {
        const result = await musicManager.update(song);
        return result;
    };

    putMany = async (yids, update) => {
        const result = await musicManager.putMany(yids, update);
        return result;
    };

};