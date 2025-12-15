import * as sessionService from '../services/session.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { useragent } from '../utils/useragent.utils.js';
import { logger } from '../utils/logger.utils.js';
import env from '../config/env.config.js';

const isDev = env.environment === 'development';

const logout = async (req, res) => {
    res.clearCookie('accessToken', { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'none' });
    res.clearCookie('refreshToken', { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'none' });
    res.sendSuccess({ status: 'success' });
};

const postRefresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).send({ error: 'No token' });
    try {
        const result = await sessionService.postRefresh(refreshToken);
        res.cookie('accessToken', result, { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'none', maxAge: 30 * 60 * 1000 });
        if (result) return res.sendSuccess({ status: 'success' });
    } catch (error) {
        logger({ error, route: req.originalUrl });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

const postSession = async (req, res) => {
    const userAgent = await useragent(req.headers['user-agent'] || '');
    try {
        const result = await sessionService.postSession({ ...req.body }, userAgent);
        const { accessToken, refreshToken, user } = result;
        if (accessToken && refreshToken) {
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'none', maxAge: 30 * 60 * 1000 });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'none', maxAge: 90 * 24 * 60 * 60 * 1000 });
        };
        if (result) return res.sendSuccess({ status: 'success', result: user || null });
    } catch (error) {
        const body = req.body;
        logger({ error, route: req.originalUrl });
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getCurrent = async (req, res) => {
    try {
        const result = await sessionService.getCurrent({ ...req.user });
        if (result) return res.sendSuccess(result);
    } catch (error) {

        console.log(error);

        logger({ error, route: req.originalUrl, user: req?.user?._id || null });
        if (error instanceof CustomNotFound) return res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { logout, postRefresh, postSession, getCurrent };