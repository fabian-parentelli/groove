import User from './user.manager.js';
import UserAgent from './userAgent.manager.js';
import Activity from './activity.manager.js';

export const userManager = new User();
export const userAgentManager = new UserAgent();
export const activityManager = new Activity();