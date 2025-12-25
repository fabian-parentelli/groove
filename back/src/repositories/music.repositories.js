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
    
    getById = async (id) => {
        const result = await musicManager.getById(id);
        return result;
    };
    
    getMusic = async (query, page, limit) => {
        const result = await musicManager.getMusic(query, page, limit);
        return result;
    };
    
    update = async (song) => {
        const result = await musicManager.update(song);
        return result;
    };

};