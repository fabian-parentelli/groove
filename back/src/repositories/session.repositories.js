import { userManager, userAgentManager, activityManager } from '../dao/manager/index.manager.js';
import { createHash, isValidPassword } from "../utils/hashedPassword.utils.js";
import { CustomNotFound } from '../utils/custom-exceptions.utils.js';
import { postGmail } from '../services/contact.service.js';

export default class SessionRepository {

    register = async ({ location, ...user }, userAgent) => {

        if (location) {
            const { language, ...rest } = location;
            user.location = rest;
            user.language = language;
        };

        const userExsis = await userManager.getOne({ email: user.email }, { _id: 1 });
        if (userExsis) throw new CustomNotFound('Ya existe un usauro con esye email');
        user.password = createHash(user.password);
        user.lastConnection = new Date();

        const result = await userManager.postUser(user);
        if (!result) throw new CustomNotFound('Error al crear el usuario en BD');
        delete result.password;

        setImmediate(async () => {
            await postGmail('register', result);
            await userAgentManager.postUserAgent({ ...userAgent, uid: result._id });
            await activityManager.postActivity({ eid: result._id, uid: result._id, type: 'register' });
        });

        return result;
    };

    login = async (body, userAgent) => {
        const user = await userManager.getOne({ email: body.email }, {});
        if (!user) throw new CustomNotFound('Error al tarer el usuario de base de datos');        
        if (!user.active) throw new CustomNotFound('Cuenta bloqueada comunícate con nuestro equipo');
        const comparePassword = isValidPassword(user, body.password);
        if (!comparePassword) throw new CustomNotFound('La contrasela no es correcta');
        delete user.password;
        user.lastConnection = new Date();
        setImmediate(async () => {
            await postGmail('login', { ...user, userAgent });
            await userAgentManager.update({ ...userAgent, uid: user._id });
            await activityManager.postActivity({ eid: user._id, uid: user._id, type: 'login' });
            await userManager.updateOne(user._id, { lastConnection: user.lastConnection });
        });

        return user;
    };

};