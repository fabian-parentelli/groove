import { categoryRepository, musicRepository } from "../repositories/index.repositories.js";
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { validation } from '../validations/category.val.js';

const postOneCategory = async (body) => {
    const result = await categoryRepository.postCategory(body);
    if (!result) throw new CustomNotFound('Error al crear el tópico');
    return { status: 'success', result };
};

const getByName = async ({ name }) => {
    const result = await categoryRepository.getCategory({ name });
    if (!result) throw new CustomNotFound('Error al tarer la categoría');
    const music = await musicRepository.getRandom({ topics: { $in: [name] } }, 50);
    if (!music) throw new CustomNotFound('Error al traer la música');
    result.list = music;
    result.yids = music.map(doc => doc.yid);
    return { status: 'success', result };
};

const postCategory = async (songs) => {

    if (!songs) throw new CustomNotFound('No hay canciones para obtener las categorías');

    const categories = await categoryRepository.getAll() || [];

    songs.forEach(doc => {
        doc.topics.forEach(top => {
            const index = categories.findIndex(cat => cat.name === top);
            if (index !== -1) {
                categories[index].amount += 1;
                categories[index].change = true;
            } else categories.push({ name: top, amount: 1, create: true });
        });
    });

    const creates = categories.filter(doc => doc.create);
    const changes = categories.filter(doc => doc.change && !doc.create);

    if (creates.length > 0) await categoryRepository.postMany(creates);
    if (changes.length > 0) await categoryRepository.updManyAmount(changes);

    return { status: 'develop' };
};

const getCategories = async ({ limit = 100, names }) => {
    const query = {};
    if (names) {
        const arr = Array.isArray(names) ? names : names.split(',');
        query.name = { $in: arr };
    };
    const result = await categoryRepository.getAll(query, limit) || [];
    if (!result || result.length == 0) throw new CustomNotFound('Error al obtener las categorías');
    return { status: 'success', result };
};

const putCategory = async (body, user) => {
    body = validation.putCategory(body);
    const category = await categoryRepository.getById(body._id);
    if (!category) return { status: 'error', message: `Error al traer la categoria: ${body._id}` };
    const result = await categoryRepository.update({ ...category, ...body });
    if (!result) return { status: 'error', message: `Error al editar la categoria: ${body._id}` };
    return { status: 'success', result };
};

export { postCategory, postOneCategory, getByName, getCategories, putCategory };