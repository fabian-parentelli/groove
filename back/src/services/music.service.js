// import {  } from "../repositories/index.repositories.js";
import { getPlayListApi } from '../helpers/getPlayList.api.js';
import { getVideoInfoApi } from '../helpers/getVideoInfo.api.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import * as musicValidate from '../utils/validates/music.validate.js';

const postMusic = async (body, user) => {

    musicValidate.postMusicVal(body, user);
    const id = getYoutubeId(body);

    let music;
    if (body.type.startsWith("p")) {
        const response = await getPlayListApi(id, body.type);
        if (!response && response.length == 0) throw new CustomNotFound('Error al tarer los listId de Youtube');
        music = await getVideoInfoApi(response);
    } else music = await getVideoInfoApi([id]);
    const musicFormat = formatYoTube(music);
    
    console.log(musicFormat);
    
    // Esto ya funciona, ahora hay que ver como resuelvo el tema del título
    // la imagen de la playlist
    // tengo que guardar en base de datos.
    // Que se le guarde al usaurio como un playlist paraque la vea.
    // Ya tare los datos eso es imporatante ....


    // console.log(response);

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

function formatYoTube (music) {

    const result = music.map(doc => {

        return {
            yid: doc.id,
            title: doc.snippet.title,
            img: doc.snippet.thumbnails.medium.url,
            duration: timeFormat(doc.contentDetails.duration),
            topics: getTopicNames(doc.topicDetails. topicCategories)
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