import Router from './routes.js';
import * as listController from '../controllers/list.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class ListRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, listController.getLists);
    };
};