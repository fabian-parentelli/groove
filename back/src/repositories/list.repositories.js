import { listManager } from '../dao/manager/index.manager.js';

export default class ListRepository {

    postList = async (songs) => {
        const result = await listManager.postList(songs);
        return result;
    };

};