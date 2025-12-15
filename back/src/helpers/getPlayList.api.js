import env from '../config/env.config.js';

const getPlayListApi = async (playlistId) => {

    const URL_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
    const parametros = new URLSearchParams({
        part: 'contentDetails',
        playlistId: playlistId,
        maxResults: '50',
        key: env.youtube
    });

    const urlCompleta = `${URL_API}?${parametros.toString()}`;

    try {
        const response = await fetch(urlCompleta);
        const data = await response.json();

        if (data.error) {
            console.error('Error de la API:', data.error.message);
            return [];
        };

        const videoIds = data.items.map(item => item.contentDetails.videoId);

        return videoIds;

    } catch (error) {
        console.error('Error al realizar la petición:', error);
        return [];
    }
}

export { getPlayListApi };