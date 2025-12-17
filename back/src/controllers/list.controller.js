import * as listService from '../services/list.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { logger } from '../utils/logger.utils.js';

const getLists = async (req, res) => {
    try {
        const result = await listService.getLists({ ...req.query });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

export { getLists };