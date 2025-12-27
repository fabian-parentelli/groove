const getYoutubeId = (body) => {
    if (body.type === 'sid' || body.type === 'pid') return body.path;
    if (body.type === 'surl') return getSongId(body.path);
    if (body.type === 'purl') return getListId(body.path);
};

function formatYoTube(music) {

    const result = music.map(doc => {

        return {
            yid: doc.id,
            title: doc.snippet.title,
            img: doc.snippet.thumbnails.medium.url,
            duration: timeFormat(doc.contentDetails.duration),
            topics: getTopicNames(doc.topicDetails.topicCategories),
        }
    });

    return result;
};

export { getYoutubeId, formatYoTube };

function getListId(url) {
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
};

function getSongId(url) {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
};

function getTopicNames(topics = []) {
    return topics
        .map(url => url.split('/').pop())
        .filter(name => name !== 'Music');
}

const timeFormat = (isoDuration) => {
    const matches = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!matches) return 0;

    const hours = parseInt(matches[1] || 0) * 3600;
    const minutes = parseInt(matches[2] || 0) * 60;
    const seconds = parseInt(matches[3] || 0);

    return hours + minutes + seconds;
};