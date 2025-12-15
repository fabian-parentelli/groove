import { activityModel } from '../models/activity.model.js';

export default class Activity {

    postActivity = async (activity) => {
        return await activityModel.create(activity);
    };

};