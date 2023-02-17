import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"
import { nextAxios, authAxios } from '../utils/axios'
import HeadInfo from '../utils/HeadInfo';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [redirect, setRedirect] = useState('/');

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token')

            if (token) {
                authAxios.defaults.headers.Authorization = `Bearer ${token}`
                try {
                    const {
                        data: { data: user },
                    } = await authAxios.get('/profile')
                    user && setUser(user)
                    setUserLoading(false)
                } catch (err) {
                    console.error(err)
                    localStorage.removeItem('token')
                    setUserLoading(false)
                }
            } else {
                setUser(null)
                setUserLoading(false)
            }
        }

        loadUser();
    }, []);

    const handleRegister = async ({ name, phone_number, password, email, otp }) => {
        try {
            await nextAxios.post('/register', {
                name,
                phone_number,
                password,
                email,
                otp
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async ({ phone_number, password }) => {
        try {
            const res = await nextAxios.post('/login', {
                phone_number,
                password
            })

            //set token
            localStorage.setItem('token', res.data.token);
            authAxios.defaults.headers.Authorization = `Bearer ${res.data.token}`
            const {
                data: { data: user },
            } = await authAxios.get('/profile');
            user && setUser(user);

            //save cart
            if (
                window &&
                JSON.parse(localStorage.getItem('localCart'))?.items.length > 0
            ) {
                const cartArray = JSON.parse(
                    localStorage.getItem('localCart')
                ).items.map((item) => ({
                    id: item.id,
                    quantity: item.quantity
                }))
                await authAxios({
                    method: 'POST',
                    url: '/cart',
                    data: { products: cartArray },
                }).then(() => localStorage.removeItem('localCart'));
            }

            //save wish
            if (
                window &&
                JSON.parse(localStorage.getItem('localWish'))?.items.length > 0
            ) {
                const wishArray = JSON.parse(
                    localStorage.getItem('localWish')
                ).items.map((item) => ({
                    id: item.id,
                }))
                await authAxios({
                    method: 'POST',
                    url: '/wishlist',
                    data: { products: wishArray },
                }).then(() => localStorage.removeItem('localWish'))
            }

            //redirect to main page after successful login
            router.push(redirect);
        } catch (error) {
            console.error(error);
        }
    }

    const sendOtp = async ({ phone_number }) => {
        try {
            await nextAxios.post('/otp'), {
                phone_number
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const checkOtp = async ({ phone_number, otp }) => {
        console.log(phone_number, otp)
        try {
            await nextAxios.post('/otp/check', {
                phone_number,
                otp,
            })
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    const handleLogout = (event) => {
        event.preventDefault;
        localStorage.removeItem('token');
        setUser(null);
        delete authAxios.defaults.headers.Authorization;
    }

    const values = {
        user,
        userLoading,
        handleLogin,
        handleRegister,
        sendOtp,
        checkOtp,
        handleLogout,
        setRedirect
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

const AuthGuard = ({ children }) => {
    const { user, userLoading, setRedirect } = useAuth()
    const router = useRouter();

    useEffect(() => {
        if (!userLoading) {
            if (!user) {
                setRedirect(router.isReady ? router.asPath : '/')
                router.push('/signin')
            }
        }
    }, [userLoading, router, user, setRedirect])

    if (userLoading) {
        return (
            <div className='fixed-layer'>
                <HeadInfo title="Загрузка..." />
                Загрузка
            </div>
        )
    }

    if (!userLoading && user) {
        return <>{children}</>
    }

    return null
}

export default AuthGuard;   