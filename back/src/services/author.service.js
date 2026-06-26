import { musicRepository, albumRepository } from "../repositories/index.repositories.js";
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';

const getAuthorMusic = async ({ name }) => {

    const query = { author: { $regex: new RegExp(name, 'i') }, active: true };

    const [music, albums] = await Promise.all([
        musicRepository.getAll(query),
        albumRepository.getAlbums(query, { page: 1, limit: 50 }),
    ]);

    if ((!music || music.length === 0) && (!albums || albums.docs?.length === 0)) {
        throw new CustomNotFound('No se encontraron resultados para este autor', 'info');
    };

    return {
        status: 'success',
        result: {
            name,
            songs: music || [],
            albums: albums?.docs || []
        }
    };
};

export { getAuthorMusic };