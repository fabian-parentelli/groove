const url = 'http://localhost:9092';

export const apiFetch = async (path, options = {}, isFormData = false) => {

    const config = {
        credentials: 'include',
        headers: isFormData ? {} : { 'Content-Type': 'application/json', Accept: 'application/json' },
        ...options,
    };

    let response = await fetch(`${url}${path}`, config);

    if (response.status === 401) {
        const refresh = await fetch(`${url}/api/session/refresh`, {
            method: 'POST',
            credentials: 'include',
        });
        if (refresh.ok) response = await fetch(`${url}${path}`, config);
        else return { error: 'Sesión expirada' };
    };

    const contentType = response.headers.get('content-type');
    const data = contentType && contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    return data?.data || data;
};