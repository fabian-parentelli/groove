import { musicManager } from '../dao/manager/index.manager.js';

export default class MusicRepository {

    postMany = async (songs) => {
        const result = await musicManager.postMany(songs);
        return result;
    };
    
    getAll = async () => {
        const result = await musicManager.getAll();
        return result;
    };

};