const updateOptions = (options) => {
    const update = {
        ...options,
        headers: {
            ...options.headers,
            Accept: 'application/json',
        },
    }

    return update
}

const fetcher = async (url = '', options = {}) => {
    const __url = new URL(process.env.API + url);
    return fetch(__url, updateOptions(options)).then((res) => res.json())
};

export default fetcher;