import Router from './routes.js';
import * as controller from '../controllers/author.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class AuthorRouter extends Router {
    init() {
        this.get('/:name', ['PUBLIC'], passportEnum.NOTHING, controller.getAuthorMusic);
    };
};