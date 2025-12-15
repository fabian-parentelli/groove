import { transporter } from '../../config/nodemailer.conf.js';
import { logger } from "../logger.utils.js";

export const sendEmail = async (email) => {
    
    try {
        await transporter.sendMail({
            from: "Groove music",
            to: email.to,
            subject: email.subject,
            html: email.html
        });

    } catch (error) {
        logger({ error, route: '/utils/sendEmail.utils.js', user: email.to });
    };
};