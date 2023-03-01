export const isActive = ({ store, localStore, product }) => {
    let result = 0; // initialize result variable

    if (store) { // check if product id matches any item id in store
        result = store.items.some((item) => item.id === product.id) ? 1 : 0;
    }
    else if (localStore) { // check if product id matches any item id in localStore
        result = localStore.items.some((item) => item.id === product.id) ? 1 : 0
    }

    return result;
}


export const thousandSeperate = (data = '') => {
    return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}