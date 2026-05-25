import * as categoryService from '../services/category.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { logger } from '../utils/logger.utils.js';

const postCategory = async (req, res) => {
    try {
        const result = await categoryService.postOneCategory({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl, user: req.user._id });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

const getCategories = async (req, res) => {
    try {
        const result = await categoryService.getCategories();
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

export { postCategory, getCategories };