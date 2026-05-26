import Router from './routes.js';
import * as controller from '../controllers/category.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class CategoryRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportEnum.JWT, controller.postCategory);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, controller.getCategories);
        this.put('/', ['ADMIN'], passportEnum.JWT, controller.putCategory);
    };
};