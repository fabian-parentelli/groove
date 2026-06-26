import * as authorService from '../services/author.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { logger } from '../utils/logger.utils.js';

const getAuthorMusic = async (req, res) => {
    try {
        const result = await authorService.getAuthorMusic({ ...req.params });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl });
        if (error instanceof CustomNotFound) return res.status(404).send(error.message);
        res.sendServerError(error.message);
    };
};

export { getAuthorMusic };