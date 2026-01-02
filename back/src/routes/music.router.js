import Router from './routes.js';
import * as musicController from '../controllers/music.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class MusicRouter extends Router {
    init() {
        this.post('/', ['USER', 'ADMIN'], passportEnum.JWT, musicController.postMusic);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, musicController.getMusic);
        this.put('/', ['USER', 'ADMIN'], passportEnum.JWT, musicController.putMusic);
    };
};