import { loadEnvFile } from "process";

loadEnvFile();

export default {
    port: process.env.PORT,
    frontUrl: process.env.FRONT_URL,
    privateKeyPassport: process.env.PRIVATEKEYPASSPORT,
    mongoDB: process.env.MONGO,

    // keyAes: process.env.KEYAES,
    
    
    jwtPrivateKey: process.env.JWTPRIVATEKEY,
    environment: process.env.ENVIRONMENT,
    jwtPrivateRefresh: process.env.PRIVATEKEYREFRESH,

    // Cloudinary
    cloudName: process.env.CLOUDNAME,
    apiKey: process.env.APIKEY,
    apiSecret: process.env.APISECRET,
};