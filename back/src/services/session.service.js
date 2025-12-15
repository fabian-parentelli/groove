import { sessionRepository, userRepository } from "../repositories/index.repositories.js";
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { generateTokens, verifyToken } from '../utils/jwt.utils.js';
import * as validate from '../utils/validates/session.validate.js';

const postRefresh = async (refreshToken) => {
    if (!refreshToken) throw new CustomNotFound('Token vencido, vuelve a inciar sesión', 'info');
    const accessToken = verifyToken(refreshToken);
    if (!accessToken) throw new CustomNotFound('No se puede generar el accessToken', 'warn');
    return accessToken;
};

const postSession = async (body, userAgent) => {
    validate.sessionPostVal(body);
    const result = await sessionRepository[body.type](body, userAgent);
    if (!result) throw new CustomNotFound('Error a guardar en base de datos');
    const { _id, active, role } = result;
    const { accessToken, refreshToken } = generateTokens({ _id, active, role });
    return { status: 'success', accessToken, refreshToken, user: result };
};

const getCurrent = async (token) => {
    const result = await userRepository.getById(token._id);
    if (!result) throw new CustomNotFound('Error al traer los datos del usuarios', 'info');
    return { status: 'success', result };
};

export { postRefresh, postSession, getCurrent };