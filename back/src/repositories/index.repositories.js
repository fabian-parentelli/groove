import UserRepository from './user.repositories.js';
import SessionRepository from './session.repositories.js';
import MusicRepository from './music.repositories.js';
import ActivityRepository from './activity.repositories.js';
import ListRepository from './list.repositories.js';

export const userRepository = new UserRepository();
export const sessionRepository = new SessionRepository();
export const musicRepository = new MusicRepository();
export const activityRepository = new ActivityRepository();
export const listRepository = new ListRepository();