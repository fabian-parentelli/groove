import { activityManager } from '../dao/manager/index.manager.js';

export default class ActivityRepository {

    postActivity = async (activity) => {
        const result = await activityManager.postActivity(activity);
        return result;
    };

};