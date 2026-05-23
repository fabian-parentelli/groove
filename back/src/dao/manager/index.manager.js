import User from './user.manager.js';
import UserAgent from './userAgent.manager.js';
import Activity from './activity.manager.js';
import Music from './music.manager.js';
import List from './list.manager.js';
import Category from './category.manager.js';
import Album from './album.manager.js';

export const userManager = new User();
export const userAgentManager = new UserAgent();
export const activityManager = new Activity();
export const musicManager = new Music();
export const listManager = new List();
export const categoryManager = new Category();
export const albumManager = new Album();