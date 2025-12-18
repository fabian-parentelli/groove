import * as musicService from '../services/music.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { logger } from '../utils/logger.utils.js';

const postMusic = async (req, res) => {
    const user = req.user;
    try {
        const result = await musicService.postMusic({ ...req.body }, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl, user: user._id });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

const getMusic = async (req, res) => {
    try {
        const result = await musicService.getMusic({ ...req.query });
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

export { postMusic, getMusic };