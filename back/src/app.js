import express from 'express';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import mongoDB from './dao/mongo.js';
import cors from 'cors';
import env from './config/env.config.js';
import cookieParser from 'cookie-parser';

import { musicRouter, sessionRouter } from './routes/index.router.js';

const app = express();
mongoDB();

app.use(cors({ origin: env.frontUrl, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.use('/api/music', musicRouter);
app.use('/api/session', sessionRouter);

app.listen(env.port, async () => console.log(`Server conected ${env.port}`));