import * as sessionService from '../services/session.service.js';
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { useragent } from '../utils/useragent.utils.js';
import { logger } from '../utils/logger.utils.js';
import env from '../config/env.config.js';

const isDev = env.environment === 'development';

const postRefresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        const result = await sessionService.postRefresh(refreshToken);
        res.cookie('accessToken', result, { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'none', maxAge: 15 * 60 * 1000 });
        if (result) return res.sendSuccess({ status: 'success' });
    } catch (error) {
        logger({ error, route: req.originalUrl });
        res.clearCookie('refreshToken', { httpOnly: true, secure: !isDev, sameSite: isDev ? 'lax' : 'none' });
        if (error instanceof CustomNotFound) return res.status(401).res.send(error.message);
        res.sendServerError(error.message);
    };
};

export { postRefresh };