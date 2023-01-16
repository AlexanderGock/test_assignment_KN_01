const JSON_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const request = (url, options) => {
    return new Promise((resolve, reject) => {
        if (!url) reject(new Error('URL parameter is mandatory'));

        fetch(url, options)
            .then(async (response) => {
                try {
                    const json = await response.json();
                    if (response.status >= 400) {
                        reject(response);
                    }
                    resolve(json);
                } catch (e) {
                    reject(response);
                }
            })
            .catch(reject);
    });
};

export const get = (url, params) => {
    if (!params) {
        return request(url);
    }
    const urlWithParams = Object.keys(params).reduce((urlToBuild, nextKey) => {
        const param = nextKey + '=' + params[nextKey];
        if (typeof params[nextKey] === "undefined" || params[nextKey] == null) {
            return urlToBuild;
        }
        return urlToBuild + (urlToBuild.indexOf('?') === -1 ? '?' : '&') + param;
    }, url);
    return request(urlWithParams);
};

export const put = (url, data) => {
    return request(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: JSON_HEADERS,
    });
};
