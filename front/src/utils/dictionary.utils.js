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
    };
    
    return type[category] ? type[category]() : category;
};

export { categoriesDic };