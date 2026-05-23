import { albumManager } from '../dao/manager/index.manager.js';

export default class AlbumRepository {

    postAlbum = async (album) => {
        const result = await albumManager.postAlbum(album);
        return result;
    };
    
    getAlbums = async (query, options) => {
        const result = await albumManager.getAlbums(query, options);
        return result;
    };

};