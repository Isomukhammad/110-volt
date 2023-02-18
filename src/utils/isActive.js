export const isActive = ({ store, localStore, product }) => {
    if (!store || !product || !localStore) return 0;
    if (store) return store.items.some((item) => item.id === product.id) ? 1 : 0;
    return localStore.items.some((item) => item.id === product.id) ? 1 : 0;
}
