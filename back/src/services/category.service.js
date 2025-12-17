import { categoryRepository } from "../repositories/index.repositories.js";
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';

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

const getCategories = async () => {
    const result = await categoryRepository.getAll() || [];
    if (!result || result.length == 0) throw new CustomNotFound('Error al obtener las categorías');
    return { status: 'success', result };
};

export { postCategory, getCategories };