import { useState, createContext, useContext, useEffect } from 'react';
import { authAxios } from '../utils/axios';
import { useRouter } from 'next/router';
import { useAuth } from './authContext';
import { toast } from 'react-toastify';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const router = useRouter();
    const [localCart, setLocalCart] = useState(null)
    const [cart, setCart] = useState(null)
    const [cartLoading, setCartLoading] = useState(true)
    const [cartReqLoading, setCartReqLoading] = useState(false)
    const { user, userLoading, handleRegister } = useAuth();

    useEffect(() => {
        async function loadCart() {
            if (!userLoading) {
                try {
                    if (user) {
                        setLocalCart(null)

                        await authAxios
                            .get('/cart', { headers: { 'Accept-Language': router.locale } })
                            .then((res) => setCart(res.data))

                        setCartLoading(false)
                    } else {
                        setCart(null)
                        setCartLoading(false)
                        const localStorageCart = localStorage.getItem('localCart')
                        if (localStorageCart) {
                            setLocalCart(JSON.parse(localStorageCart))
                        } else {
                            setLocalCart({
                                quantity: 0,
                                total: 0,
                                items: [],
                            })
                        }
                    }
                } catch (err) {
                    console.error(err)
                    setCartLoading(false)
                }
            }
        }

        loadCart()
    }, [user, userLoading, router.locale])

    useEffect(() => {
        localCart && localStorage.setItem('localCart', JSON.stringify(localCart))
    }, [localCart])

    async function getAndSetCart() {
        try {
            await authAxios.get('/cart').then((res) => setCart(res.data))
        } catch (err) {
            console.error(err)
        }
    }

    // handle cart opetations
    async function handleCart({ type, product, quantity = 1, hint }) {
        if (cart) {
            try {
                setCartReqLoading({ id: product?.id, type, hint })
                switch (type) {
                    case 'CREATE':
                        await createCart(product, quantity)
                        await getAndSetCart()
                        break
                    case 'SWITCH':
                        if (cart.items.some((item) => item.id == product.id)) {
                            await deleteCart(product)
                        } else {
                            await addCart(product, quantity);
                        }
                        await getAndSetCart()
                        break
                    case 'ADD':
                        await addCart(product, quantity)
                        await getAndSetCart()
                        break
                    case 'UPDATE':
                        await updateCart(product, quantity)
                        await getAndSetCart()
                        break
                    case 'DELETE':
                        await deleteCart(product)
                        await getAndSetCart()
                        break
                    case 'CLEAR':
                        await clearCart()
                        await getAndSetCart()
                        break
                }
            } catch (err) {
                console.error(err)
            } finally {
                setCartReqLoading(false)
            }
        } else if (localCart) {
            switch (type) {
                case 'CREATE':
                    createLocalCart(product, quantity)
                    break
                case 'SWITCH':
                    if (localCart.items.some((item) => item.id == product.id)) {
                        deleteLocalCart(product, quantity)
                    } else {
                        addLocalCart(product, quantity)
                    }
                    break
                case 'ADD':
                    if (localCart.items.some((item) => item.id == product.id)) {
                        updateLocalCart(product, quantity)
                    } else {
                        addLocalCart(product, quantity)
                    }
                    break
                case 'UPDATE':
                    updateLocalCart(product, quantity)
                    break
                case 'DELETE':
                    deleteLocalCart(product, quantity)
                    break
                case 'CLEAR':
                    clearLocalCart()
                    break
            }
        }
    }

    // If user is authenticated
    async function clearCart() {
        try {
            await authAxios.post('/cart/clear')
        } catch (err) {
            console.error(err)
        }
    }

    async function createCart(product, quantity) {
        try {
            await authAxios({
                method: 'POST',
                url: '/cart',
                data: {
                    products: [
                        {
                            id: product.id,
                            quantity: quantity,
                        },
                    ],
                },
            })
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteCart(product) {
        try {
            await authAxios.delete(`/cart/items/remove`, {
                data: { product_id: product.id },
            })
        } catch (err) {
            console.error(err);
        }
    }

    async function updateCart(product, quantity) {
        try {
            if (quantity > 0) {
                await authAxios.put(`/cart/items/update`, {
                    product_id: product.id,
                    quantity,
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function addCart(product, quantity) {
        try {
            if (quantity > 0) {
                await authAxios.post(`/cart/items/add`, {
                    product_id: product.id,
                    quantity,
                })
            }
        } catch (err) {
            toast.error(err.response.data.errors.quantity[0])
            console.error(err);
        }
    }

    // If user is not authenticated
    function clearLocalCart() {
        setLocalCart({
            quantity: 0,
            total: 0,
            items: [],
        })
    }

    function createLocalCart(product, quantity) {
        setLocalCart({
            quantity,
            total: product.current_price * quantity,
            items: [
                {
                    id: product.id,
                    name: product.name,
                    current_price: product.current_price,
                    old_price: product.old_price,
                    quantity,
                    line_subtotal: product.old_price
                        ? product.old_price * quantity
                        : null,
                    line_total: product.current_price * quantity,
                    product,
                },
            ],
        })
    }

    function deleteLocalCart(product, quantity) {
        setLocalCart({
            quantity: localCart.quantity - quantity,
            total: localCart.total - product.current_price * quantity,
            items: localCart.items.filter((item) => item.id !== product.id),
        })
    }

    function updateLocalCart(product, quantity) {
        setLocalCart({
            quantity: localCart.quantity + quantity,
            total: localCart.total + product.current_price * quantity,
            subtotal: product.old_price
                ? localCart.subtotal + product.old_price * quantity
                : localCart.subtotal,
            items: localCart.items.map((item) =>
                item.id === product.id
                    ? {
                        id: product.id,
                        name: product.name,
                        current_price: product.current_price,
                        old_price: product.old_price,
                        quantity: item.quantity + quantity,
                        line_subtotal: product.old_price
                            ? item.line_subtotal + product.old_price * quantity
                            : item.line_subtotal,
                        line_total: item.line_total + product.current_price * quantity,
                        product,
                    }
                    : item
            ),
        })
    }

    function addLocalCart(product, quantity) {
        setLocalCart({
            quantity: localCart.quantity + quantity,
            total: localCart.total + product.current_price * quantity,
            items: [
                ...localCart.items,
                {
                    id: product.id,
                    name: product.name,
                    current_price: product.current_price,
                    old_price: product.old_price,
                    quantity,
                    line_subtotal: product.old_price
                        ? product.old_price * quantity
                        : null,
                    line_total: product.current_price * quantity,
                    product,
                },
            ],
        })
    }

    const values = {
        handleCart,
        cartReqLoading,
        cartLoading,
        cart,
        setCart,
        localCart,
        setLocalCart,
        getAndSetCart
    }

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)