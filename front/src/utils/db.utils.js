const DB_NAME = "music_app";
const DB_VERSION = 1;
const STORE_NAME = "music";
const UNIQUE_ID = "main_music";
let dbInstance = null;

async function initDB() {
    return new Promise((resolve, reject) => {
        if (dbInstance) {
            resolve(dbInstance);
            return;;
        };
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                });
            };
        };
        request.onsuccess = (event) => {
            dbInstance = event.target.result;
            resolve(dbInstance);
        };
        request.onerror = () => {
            reject("Error abriendo IndexedDB");
        };
    });
};

async function saveMusic(data) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        store.put({
            id: UNIQUE_ID,
            ...data
        });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(false);
    });
};

async function getMusic() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.get(UNIQUE_ID);
        request.onsuccess = () => {
            resolve(request.result);
        };
        request.onerror = () => {
            reject(null);
        };
    });
};

export { initDB, saveMusic, getMusic };