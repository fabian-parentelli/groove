import { musicRepository, activityRepository, listRepository } from "../repositories/index.repositories.js";
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

export { postMusic };

function getYoutubeId(body) {
    if (body.type === 'sid' || body.type === 'pid') return body.path;
    if (body.type === 'surl') return getSongId(body.path);
    if (body.type === 'purl') return getListId(body.path);
};

function getListId(url) {
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
};

function getSongId(url) {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
};

function formatYoTube(music) {

    const result = music.map(doc => {

        return {
            yid: doc.id,
            title: doc.snippet.title,
            img: doc.snippet.thumbnails.medium.url,
            duration: timeFormat(doc.contentDetails.duration),
            topics: getTopicNames(doc.topicDetails.topicCategories)
        }
    });

    return result;
};

const timeFormat = (isoDuration) => {
    const matches = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!matches) return 0;

    const hours = parseInt(matches[1] || 0) * 3600;
    const minutes = parseInt(matches[2] || 0) * 60;
    const seconds = parseInt(matches[3] || 0);

    return hours + minutes + seconds;
};

function getTopicNames(topics = []) {
    return topics
        .map(url => url.split('/').pop())
        .filter(name => name !== 'Music');
}