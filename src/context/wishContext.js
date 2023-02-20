import { useState, createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from './authContext'
import { authAxios } from '../utils/axios'

const WishContext = createContext({})

export const WishProvider = ({ children }) => {
    const router = useRouter()
    const [localWish, setLocalWish] = useState(null)
    const [wish, setWish] = useState(null)
    const [wishLoading, setWishLoading] = useState(true)
    const [wishReqLoading, setWishReqLoading] = useState(false)
    const { user, userLoading } = useAuth()

    useEffect(() => {
        async function loadWish() {
            try {
                if (!userLoading) {
                    if (user) {
                        setLocalWish(null)
                        await authAxios.get('/wishlist', { headers: { 'Accept-Language': router.locale } }).then((res) => setWish(res.data))
                        setWishLoading(false)
                    } else {
                        setWish(null)
                        setWishLoading(false)
                        const localStorageWish = localStorage.getItem('localWish')
                        if (localStorageWish) {
                            setLocalWish(JSON.parse(localStorageWish))
                        } else {
                            setLocalWish({
                                quantity: 0,
                                items: [],
                            })
                        }
                    }
                }
            } catch (err) {
                console.error(err)
                setWishLoading(false)
            }
        }

        loadWish()
    }, [user, userLoading, router.locale])

    useEffect(() => {
        localWish && localStorage.setItem('localWish', JSON.stringify(localWish))
    }, [localWish])

    async function getAndSetWish() {
        try {
            await authAxios.get('/wishlist').then((res) => setWish(res.data))
        } catch (err) {
            console.error(err)
        }
    }

    // handle wish opetations
    async function handleWish({ type, product, hint }) {
        if (wish) {
            try {
                setWishReqLoading({ id: product?.id, type, hint })
                switch (type) {
                    case 'ADD':
                        if (wish.items.some((item) => item.id == product.id)) {
                            await deleteWish(product)
                        } else {
                            await addWish(product)
                        }
                        await getAndSetWish()
                        break
                    case 'DELETE':
                        await deleteWish(product)
                        await getAndSetWish()
                        break
                    case 'CLEAR':
                        await clearWish()
                        await getAndSetWish()
                        break
                }
            } catch (err) {
                console.error(err)
            } finally {
                setWishReqLoading(false)
            }
        } else if (localWish) {
            switch (type) {
                case 'ADD':
                    if (localWish.items.some((item) => item.id == product.id)) {
                        deleteLocalWish(product)
                    } else {
                        addLocalWish(product)
                    }
                    break
                case 'DELETE':
                    deleteLocalWish(product)
                    break
                case 'CLEAR':
                    clearLocalWish()
                    break
            }
        }
    }

    // If user is authenticated
    async function clearWish() {
        try {
            await authAxios.post('/wishlist/clear')
        } catch (err) {
            console.error(err)
        }
    }

    async function deleteWish(product) {
        try {
            await authAxios.delete(`/wishlist/items/remove`, {
                data: { product_id: product.id },
            })
        } catch (err) {
            console.error(err)
        }
    }

    async function addWish(product) {
        try {
            await authAxios.post(`/wishlist/items/add`, {
                product_id: product.id,
            })
        } catch (err) {
            console.error(err)
        }
    }

    // If user is not authenticated
    function clearLocalWish() {
        setLocalWish({
            quantity: 0,
            items: [],
        })
    }

    function deleteLocalWish(product) {
        setLocalWish({
            quantity: localWish.quantity - 1,
            items: localWish.items.filter((item) => item.id !== product.id),
        })
    }

    function addLocalWish(product) {
        setLocalWish({
            quantity: localWish.quantity + 1,
            items: [
                ...localWish.items,
                {
                    id: product.id,
                    name: product.name,
                    product,
                },
            ],
        })
    }

    const values = {
        handleWish,

        wishReqLoading,
        wishLoading,

        wish,
        localWish,
    }

    return <WishContext.Provider value={values}>{children}</WishContext.Provider>
}

export const useWish = () => useContext(WishContext)