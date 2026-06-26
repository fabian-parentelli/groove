import MusicRouter from "./music.router.js";
import SessionRouter from "./session.router.js";
import CategoryRouter from "./categoy.router.js";
import ListRouter from "./list.router.js";
import AlbumRouter from "./album.router.js";
import AuthorRouter from "./author.router.js";
import TestRouter from "./router.test.js";

export const musicRouter = new MusicRouter().getRouter();
export const sessionRouter = new SessionRouter().getRouter();
export const categoryRouter = new CategoryRouter().getRouter();
export const listRouter = new ListRouter().getRouter();
export const albumRouter = new AlbumRouter().getRouter();
export const authorRouter = new AuthorRouter().getRouter();
export const testRouter = new TestRouter().getRouter();