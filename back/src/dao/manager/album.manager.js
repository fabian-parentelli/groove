import { albumModel } from '../models/album.model.js';

export default class Album {

    postAlbum = async (list) => {
        return await albumModel.create(list);
    };

    getAlbums = async (query, options) => {
        return await albumModel.paginate(query, { ...options, lean: true, sort: { _id: -1 } });
    };

    getById = async (id) => {
        return await albumModel.findById(id).lean();
    };

    update = async (album) => {
        return await albumModel.findByIdAndUpdate(album._id, album, { returnDocument: 'after' }).lean();
    };

};