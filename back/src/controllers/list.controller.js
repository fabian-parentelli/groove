import * as listService from '../services/list.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { logger } from '../utils/logger.utils.js';

const postList = async (req, res) => {
    const user = req.user;
    try {
        const result = await listService.postList({ ...req.body }, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl, user: user._id || null });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

const getListsAll = async (req, res) => {
    try {
        const result = await listService.getListsAll(req.user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl, user: user._id || null });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

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

const putLists = async (req, res) => {
    const user = req.user;
    try {
        const result = await listService.putLists({ ...req.body }, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl, user: user._id || null });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

const putAddSong = async (req, res) => {
    const user = req.user;
    try {
        const result = await listService.putAddSong({ ...req.body }, user);
        if (result) return res.sendSuccess(result);
    } catch (error) {
        logger({ error, route: req.originalUrl, user: user._id || null });
        if (error instanceof CustomNotFound) return res.sendServerError(error.message);
        res.sendServerError(error.message);
    };
};

export { postList, getListsAll, getLists, putLists, putAddSong };