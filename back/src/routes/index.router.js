import MusicRouter from "./music.router.js";
import SessionRouter from "./session.router.js";
import CategoryRouter from "./categoy.router.js";
import ListRouter from "./list.router.js";

export const musicRouter = new MusicRouter().getRouter();
export const sessionRouter = new SessionRouter().getRouter();
export const categoryRouter = new CategoryRouter().getRouter();
export const listRouter = new ListRouter().getRouter();