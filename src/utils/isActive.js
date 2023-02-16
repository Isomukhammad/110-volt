export const isActive = ({ store, localStore, product }) => {
    if (store) {
        return store.items.some((item) => item.id === product.id) ? 1 : 0
    } else if (localStore) {
        return localStore.items.some((item) => item.id === product.id) ? 1 : 0
    } else {
        return 0;
    }
}