const useragent = async (ua) => {

    let browser = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';

    let os = 'Unknown';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac OS')) os = 'Mac OS';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    else if (ua.includes('Linux')) os = 'Linux';

    const isMobile = /Mobi|Android/i.test(ua);
    const isTablet = /Tablet|iPad/i.test(ua);
    const isDesktop = !isMobile && !isTablet;

    const versionMatch = ua.match(/(Chrome|Firefox|Version|Edg|OPR)\/([\d.]+)/);
    const version = versionMatch ? versionMatch[2] : 'Unknown';

    const platform = os.includes('Windows') ? 'Windows'
    : os.includes('Mac') ? 'Mac'
    : os.includes('Android') ? 'Android'
    : os.includes('iOS') ? 'iOS'
    : 'Unknown';

    return {
        browser,
        version,
        os,
        platform,
        isMobile,
        isTablet,
        isDesktop
    };
};

export { useragent };