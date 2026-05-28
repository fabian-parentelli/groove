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

    getById = async (id, songRequired = true) => {
        const result = await albumManager.getById(id);
        if(songRequired) {
            result.songs = await musicManager.getAll({ yid: { $in: result.list }, active: true })
            result.songs = result.list.map(yid => result.songs.find(song => song.yid === yid)).filter(Boolean);
        };
        return result;
    };

    update = async (album) => {
        const result = await albumManager.update(album);
        return result;
    };

};