import Router from './routes.js';
import * as controller from '../controllers/album.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class AlbumRouter extends Router {
    init() {
        this.get('/:id', ['PUBLIC'], passportEnum.NOTHING, controller.getById);
        this.get('/', ['PUBLIC'], passportEnum.OPTIONAL, controller.getAlbums);
        this.put('/', ['ADMIN', 'MASTER'], passportEnum.JWT, controller.putAlbum);
    };
};