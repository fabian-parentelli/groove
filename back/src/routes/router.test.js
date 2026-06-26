import Router from './routes.js';
import { passportEnum } from '../config/enums.config.js';

import { albumRepository, musicRepository } from '../repositories/index.repositories.js';

export default class TestRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, async (req, res) => {

            const album = await albumRepository.getById('6a10f6a384c11a599076f15e')
            
            const songs = album.songs.map(doc => ({ ...doc, album: album.name }))
            
            for(const song of songs) {
                // await musicRepository.update(song);
            }

            // console.log('exito');

            console.log(songs);

            res.send({ status: 'test' });
        });

    };
};