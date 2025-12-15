import env from '../config/env.config.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';

const getVideoInfoApi = async (videoIds) => {

    if (!videoIds || videoIds.length === 0) return [];

    const URL_API = 'https://www.googleapis.com/youtube/v3/videos';

    const partesRequeridas = 'snippet,topicDetails,contentDetails';
    const idsSeparadosPorComa = videoIds.join(',');

    const parametros = new URLSearchParams({
        part: partesRequeridas,
        id: idsSeparadosPorComa,
        key: env.youtube
    });

    const urlCompleta = `${URL_API}?${parametros.toString()}`;

    try {
        const response = await fetch(urlCompleta);

        if (!response.ok) {
            const errorData = await response.json();
            throw new CustomNotFound(`Error HTTP ${response.status}: ${errorData.error?.message || 'Error desconocido de la API'}`);
        };

        const data = await response.json();
        return data.items || [];

    } catch (error) {
        console.error('ERROR EN OBTENER DETALLES DE VIDEOS (Paso 2):', error.message);
        return [];
    }
};

export { getVideoInfoApi };