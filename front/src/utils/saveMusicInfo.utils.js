import { saveMusic } from "./db.utils.js";
import { getMusicApi } from "../helpers/music/getMusic.api.js";

const saveMusicInfo = async (doc, is, setChangeList) => {

    const save = { is, name: doc.name, _id: doc._id };
    if (is === 'album') save.img = doc.img;
    if (is === 'album') save.author = doc.author;

    const response = await getMusicApi({ yids: doc.list, limit: 50 });
    if (response.status === 'success') {
        await saveMusic({ ...save, list: response.result.docs });
        setChangeList(pre => pre + 1);
    };

};

export { saveMusicInfo };