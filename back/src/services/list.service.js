import { listRepository } from "../repositories/index.repositories.js";
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';

const getLists = async ({ page = 1, limit = 12, id, active }) => {

    const query = {};
    if (id) query._id = id;
    if (active !== undefined) query.active = active;

    const result = await listRepository.getLists(query, page, limit);
    if (!result || result.length == 0) throw new CustomNotFound('Error al obtener los lisatdos');
    return { status: 'success', result };
};

export { getLists };