import { listRepository, musicRepository } from "../repositories/index.repositories.js";
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import *  as listValidate from '../utils/validates/list.validat.js';
import { validation } from "../validations/list.val.js";

const postList = async (body, user) => {
    const name = validation.postList(body);
    const result = await listRepository.postList({ name, uid: user._id });
    if (!result) throw new CustomNotFound('Error al crear la playlist', 'info');
    return { status: 'success', result };
};

const getListsAll = async (user) => {
    const result = await listRepository.getMany({ uid: user._id });
    if (!result) throw new CustomNotFound('Error al obtener los listados');
    return { status: 'success', result };
};

const getLists = async ({ page = 1, limit = 12, id, active, uid }, user) => {
    const query = {};
    if (id) query._id = id;
    if (active !== undefined) query.active = active;
    if (uid && user.role !== 'admin') query.uid = uid;
    const result = await listRepository.getLists(query, page, limit);
    if (!result || result.length == 0) throw new CustomNotFound('Error al obtener los lisatdos');
    return { status: 'success', result };
};

const putLists = async (body, user) => {
    body = listValidate.putListVal(body, user);
    const list = await listRepository.getById(body._id);
    if (!list) throw new CustomNotFound('Error al traer el listado de la canción');
    const result = await listRepository.update({ ...list, ...body });
    if (!result) throw new CustomNotFound('Error al actualizar la lista');
    return { status: 'success', result };
};

const putAddSong = async (body, user) => {
    const { _id, yid } = validation.putAddSong(body);
    const list = await listRepository.getById(_id);
    if (!list) throw new CustomNotFound('Playlist no encontrada', 'info');
    if (list.uid !== user._id) throw new CustomNotFound('No autorizado', 'info');

    if (list.list.includes(yid)) throw new CustomNotFound('La canción ya existe en la playlist', 'info');
    else list.list.push(yid);

    if (!list.img) {
        const song = await musicRepository.getOne({ yid }, { img: 1 });
        if (!song) throw new CustomNotFound('Error al traer la imagen de la canción');
        list.img = song.img;
    };

    const result = await listRepository.update(list);
    if (!result) throw new CustomNotFound('Error al agregar la canción', 'info');
    return { status: 'success', result };
};

export { postList, getListsAll, getLists, putLists, putAddSong };