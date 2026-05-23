import { validation } from "../validations/album.val.js";
import { CustomNotFound } from "../utils/custom-exceptions.utils.js";
import { albumRepository } from '../repositories/index.repositories.js';

const getAlbums = async (query) => {
    query = validation.getAlbums(query);
    const { page = 1, limit = 12 } = query;
    const result = await albumRepository.getAlbums({}, { page, limit });
    if (!result) throw new CustomNotFound('Error al tarer los álbumes');
    return { status: 'success', result };
};

export { getAlbums };