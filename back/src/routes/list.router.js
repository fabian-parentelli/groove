import Router from './routes.js';
import * as controller from '../controllers/list.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class ListRouter extends Router {
    init() {
        this.post('/', ['USER', 'ADMIN'], passportEnum.JWT, controller.postList);
        this.get('/all', ['USER', 'ADMIN'], passportEnum.JWT, controller.getListsAll);
        this.get('/', ['PUBLIC'], passportEnum.OPTIONAL, controller.getLists);
        this.put('/', ['USER', 'ADMIN'], passportEnum.JWT, controller.putLists);
        this.put('/add-song', ['USER', 'ADMIN'], passportEnum.JWT, controller.putAddSong);
    };
};