const categoriesDic = (category) => {

    const type = {
        'Music_of_Latin_America': () => { return 'Latina' },
        'Pop_music': () => { return 'Pop' },
        'Electronic_music': () => { return 'Electrónica' },
        'Hip_hop_music': () => { return 'Hip-hop' },
        'Independent_music': () => { return 'Independiente' },
        'Rock_music': () => { return 'Rock' },
        'Reggae': () => { return 'Reggae' },
        'Rhythm_and_blues': () => { return 'Ritmo y blues' },
        'Soul_music': () => { return 'Soul' },
        'Jazz': () => { return 'Jazz' },
        'Music_of_Asia': () => { return 'Asia' },
        'Country_music': () => { return 'Country' },
        'Christian_music': () => { return 'Cristiana' },
        'Performing_arts': () => { return 'Artística' },
        'cumbia': () => { return 'Cumbia' },
        'Rock_uy': () => { return 'Rock Uruguayo' },
        'Rock_ar': () => { return 'Rock Argentino' },
        'villera': () => { return 'Villera' },
        'romantic': () => { return 'Romantica' },
        'cool': () => { return 'Cheta' },
        'Rap': () => { return 'Rap' },
        'trap': () => { return 'Trap' },
        'Reggaeton': () => { return 'Reggaeton' },
    };

    return type[category] ? type[category]() : category;
};

const musicGeneres = [
    
    { name: 'Latina', topic: 'Music_of_Latin_America' },
    { name: 'Pop', topic: 'Pop_music' },
    { name: 'Electrónica', topic: 'Electronic_music' },
    { name: 'Hip-hop', topic: 'Hip_hop_music' },
    { name: 'Independiente', topic: 'Independent_music' },
    { name: 'Rock', topic: 'Rock_music' },
    { name: 'Reggae', topic: 'Reggae' },
    { name: 'Ritmo y blues', topic: 'Rhythm_and_blues' },
    { name: 'Soul', topic: 'Soul_music' },
    { name: 'Jazz', topic: 'Jazz' },
    { name: 'Asia', topic: 'Music_of_Asia' },
    { name: 'Country', topic: 'Country_music' },
    { name: 'Cristiana', topic: 'Christian_music' },
    { name: 'Artística', topic: 'Performing_arts' },
    { name: 'Cumbia', topic: 'cumbia' },
    { name: 'Rock Uruguayo', topic: 'Rock_uy' },
    { name: 'Rock Argentino', topic: 'Rock_ar' },
    { name: 'Villera', topic: 'villera' },
    { name: 'Romantica', topic: 'romantic' },
    { name: 'Cheta', topic: 'cool' },
    { name: 'Rap', topic: 'Rap' },
    { name: 'Trap', topic: 'trap' },
    { name: 'Reggaeton', topic: 'Reggaeton' },

];

export { categoriesDic, musicGeneres };