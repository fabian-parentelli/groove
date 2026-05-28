import { validation } from "../validations/album.val.js";
import { CustomNotFound } from "../utils/custom-exceptions.utils.js";
import { albumRepository } from '../repositories/index.repositories.js';

const getById = async (params) => {
    const { id } = validation.getById(params);
    const result = await albumRepository.getById(id);
    if (!result) throw new CustomNotFound('Error al tarer el álbum');
    return { status: 'success', result };
};

const getAlbums = async (query) => {
    query = validation.getAlbums(query);
    const { page = 1, limit = 12, yid, author } = query;
    let queries = {};
    if (yid) queries.list = { $in: [yid] };
    if (author) queries.author = { $regex: author.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };

    const result = await albumRepository.getAlbums(queries, { page, limit });
    if (!result) throw new CustomNotFound('Error al tarer los álbumes');
    return { status: 'success', result };
};

export { getById, getAlbums };