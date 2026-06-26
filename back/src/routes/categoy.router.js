import Router from './routes.js';
import * as controller from '../controllers/category.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class CategoryRouter extends Router {
    init() {
        this.post('/', ['ADMIN', 'MASTER'], passportEnum.JWT, controller.postCategory);
        this.get('/:name', ['PUBLIC'], passportEnum.NOTHING, controller.getByName);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, controller.getCategories);
        this.put('/', ['ADMIN', 'MASTER'], passportEnum.JWT, controller.putCategory);
    };
};