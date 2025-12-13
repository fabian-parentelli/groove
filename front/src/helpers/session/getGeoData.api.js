const getGeoData = async () => {

    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        return {
            status: 'success',
            result: {
                currency: data?.currency || null,
                currencyName: data?.currency_name || null,
                language: data.languages.split(",")[0].split("-")[0] || null,
                country: data.country_name || null,
                region: data.region || null,
                city: data.city || null
            }
        };

    } catch (err) {

        return { status: 'error', error: "No se pudo obtener la ubicación" };

    };
};

export { getGeoData };