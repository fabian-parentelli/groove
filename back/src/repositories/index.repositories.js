import UserRepository from './user.repositories.js';
import SessionRepository from './session.repositories.js';

export const userRepository = new UserRepository();
export const sessionRepository = new SessionRepository();