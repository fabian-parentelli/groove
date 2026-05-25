import { albumManager, musicManager } from '../dao/manager/index.manager.js';

export default class AlbumRepository {

    postAlbum = async (album) => {
        const result = await albumManager.postAlbum(album);
        return result;
    };

    getAlbums = async (query, options) => {
        const result = await albumManager.getAlbums(query, options);
        return result;
    };

    getById = async (id) => {
        const result = await albumManager.getById(id);
        result.songs = await musicManager.getAll({ yid: { $in: result.list }, active: true })
        result.songs = result.list.map(yid => result.songs.find(song => song.yid === yid)).filter(Boolean);
        return result;
    };

};