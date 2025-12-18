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

};