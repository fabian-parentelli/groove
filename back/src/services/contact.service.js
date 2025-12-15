import { templates } from "../utils/gmails/templates/templates.js";
import { sendEmail } from "../utils/gmails/sendEmail.utils.js";
import { titleEmail } from "../utils/gmails/gmail.utils.js";

const postGmail = async (action, data) => {

    const emailTo = {
        to: data.email,
        subject: titleEmail(action),
        html: await templates[action](data)
    };

    await sendEmail(emailTo);
};

export { postGmail };