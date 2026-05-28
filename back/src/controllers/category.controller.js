import * as service from '../services/category.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { logger } from '../utils/logger.utils.js';

const postCategory = async (req, res) => {
    try {
        const result = await service.postOneCategory({ ...req.body });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl, user: req.user._id });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

const getByName = async (req, res) => {
    try {
        const result = await service.getByName({ ...req.params });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

const getCategories = async (req, res) => {
    try {
        const result = await service.getCategories({ ...req.query });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

const putCategory = async (req, res) => {
    try {
        const result = await service.putCategory({ ...req.body }, req.user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl, user: req.user._id });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

export { postCategory, getByName, getCategories, putCategory };