import * as listService from '../services/list.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { logger } from '../utils/logger.utils.js';

const getLists = async (req, res) => {
    const user = req.user;
    try {
        const result = await listService.getLists({ ...req.query }, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl, user: user._id || null });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

export { getLists };