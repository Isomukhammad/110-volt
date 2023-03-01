const updateOptions = (options = {}, auth = false) => {
    const update = {
        ...options,
        headers: {
            ...options.headers,
            Accept: 'application/json',
        },
    }

    if (localStorage.token && auth) {
        update.headers = {
            ...update.headers,
            Authorization: `Bearer ${localStorage.token}`,
        }
    }

    return update;
}

const fetcher = async (url = '', options = {}, params = {}, auth = false) => {
    const __url = new URL(process.env.API + url);
    Object.keys(params).forEach((key) =>
        __url.searchParams.append(key, params[key])
    )

    return fetch(__url, updateOptions(options, auth)).then((res) => res.json());
};

export default fetcher;