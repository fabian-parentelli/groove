import { loadEnvFile } from "process";

loadEnvFile();

export default {
    port: process.env.PORT,
    frontUrl: process.env.FRONT_URL,
    BackUrl: process.env.BACK_URL,
    mongoDB: process.env.MONGO,
    environment: process.env.ENVIRONMENT,
    privateKeyPassport: process.env.PRIVATEKEYPASSPORT,
    userNodemailer: process.env.USERNODEMAILER,
    passNodemailer: process.env.PASSNODEMAILER,
    jwtPrivateKey: process.env.JWTPRIVATEKEY,
    jwtPrivateRefresh: process.env.PRIVATEKEYREFRESH,

    youtube: process.env.YOUTUBE,
    
    // Cloudinary
    cloudName: process.env.CLOUDNAME,
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET,
};