import { musicRepository, activityRepository, listRepository } from "../repositories/index.repositories.js";
import { formatYoTube, getYoutubeId } from "../utils/support/music.suport.js";
import { getPlayListApi } from '../helpers/getPlayList.api.js';
import { getVideoInfoApi } from '../helpers/getVideoInfo.api.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import * as musicValidate from '../utils/validates/music.validate.js';
import { postCategory } from "./category.service.js";

const postMusic = async (body, user) => {

    musicValidate.postMusicVal(body, user);
    const id = getYoutubeId(body);

    let music;
    let videoIds;
    if (body.type.startsWith("p")) {
        videoIds = await getPlayListApi(id, body.type);
        if (!videoIds && videoIds.length == 0) throw new CustomNotFound('Error al traer los listId de Youtube');
        music = await getVideoInfoApi(videoIds);
    } else music = await getVideoInfoApi([id]);
    const musicFormat = formatYoTube(music);

    const saveMusic = await musicRepository.postMany(musicFormat);
    if (!saveMusic || saveMusic.length === 0) throw new CustomNotFound('No se insertó ninguna canción, todas ya existían');

    if (!body.type.startsWith("p")) {
        setImmediate(async () => {
            await activityRepository.postActivity({ eid: saveMusic.upsertedIds[0], uid: user._id, type: 'newSong' });
            await postCategory(musicFormat);
        });
        return { status: 'success', result: saveMusic.upsertedIds[0] };
    };

    const saveList = await listRepository.postList({ name: body.name, list: videoIds, uid: user._id, originUrl: body.path });
    if (!saveList) throw new CustomNotFound('Error al guardar la lisat');

    setImmediate(async () => {
        await activityRepository.postActivity({ eid: saveList._id, uid: user._id, type: 'newList' });
        await postCategory(musicFormat);
    });

    return { status: 'success', result: saveList._id };
};

const getMusic = async ({ page = 1, limit = 1, active = true, lid, category }) => {

    // validar datos ...
    const query = {};

    if (lid) {
        const list = await listRepository.getById(lid);
        if (!list) throw new CustomNotFound('Error al tarer la lista de reproducción');
        const songs = await musicRepository.getAll({ yid: { $in: list.list }, active: true });
        if (!songs) throw new CustomNotFound('Error a tarer las canciones');
        return { status: 'success', result: { songs, listName: list.name, lid } };
    };

    if (category) query.topics = category;
    if (active !== undefined) query.active = active;

    const result = await musicRepository.getMusic(query, page, limit);
    if (!result) throw new CustomNotFound('Error al tarer al traer las canciones');
    return { status: 'success', result };
};

const putMusic = async (body, user) => {
    const fbody = musicValidate.putMusicVal(body, user);
    const song = await musicRepository.getById(fbody._id);
    if (!song) throw new CustomNotFound('Error al traer la canción de Bd');
    const result = await musicRepository.update({ ...song, ...fbody });
    if (!result) throw new CustomNotFound('Error al actualizar la canción');
    setImmediate(async () => {
        await activityRepository.postActivity({ eid: fbody._id, uid: user._id, type: 'putMusic' });
    });
    return { status: 'success', result };
};

export { postMusic, getMusic, putMusic };