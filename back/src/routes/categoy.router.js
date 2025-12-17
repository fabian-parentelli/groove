import Router from './routes.js';
import * as categoryController from '../controllers/category.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class CategoryRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, categoryController.getCategories);
    };
};