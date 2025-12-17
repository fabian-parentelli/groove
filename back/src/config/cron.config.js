import { CronJob } from 'cron';
import { logger } from '../utils/logger.utils.js';

const cornTask = (cronTime, task, timeZone = 'America/Argentina/Buenos_Aires') => {
    
    const job = new CronJob(cronTime, async () => {
        try {
            await task();
        } catch (error) {
            logger({ error, route: 'cron/ms_users' });
            console.error("Error en la tarea programada:", error);
        }
    }, null, true, timeZone);

    return job;
};

export { cornTask };