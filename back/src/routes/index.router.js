import MusicRouter from "./music.router.js";
import SessionRouter from "./session.router.js";

export const musicRouter = new MusicRouter().getRouter();
export const sessionRouter = new SessionRouter().getRouter();