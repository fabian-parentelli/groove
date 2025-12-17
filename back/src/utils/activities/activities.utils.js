import { listDto } from "./list.act.js";
import { musicDto } from "./music.act.js";
import { sessionDto } from "./session.act.js";

export const sessionDto = {
    ...sessionDto,
    ...listDto,
    ...musicDto
};