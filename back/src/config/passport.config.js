import passport from 'passport';
import env from './env.config.js';
import { Strategy as JwtStrategy } from 'passport-jwt';

const cookieExtractor = (req) => {
    if (req && req.cookies) return req.cookies['accessToken'] || null;
    return null;
};

const initializePassport = () => {
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: env.privateKeyPassport
    }, async (jwt_payload, done) => {
        try {
            if (!jwt_payload || !jwt_payload.user) return done(null, false);
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error, false);
        };
    }));
};

export default initializePassport;