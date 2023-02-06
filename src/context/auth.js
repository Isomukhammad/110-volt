import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"
import { nextAxios, authAxios } from '../utils/axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [redirect, setRedirect] = useState('/profile');
    const router = useRouter();

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                authAxios.defaults.headers.Authorization = `Bearer ${token}`
            } else {
                setUser(null);
                setUserLoading(false);
            }
        }
    })

    const handleLogin = async ({ phone_number, password }) => {
        try {
            const res = await nextAxios.post('/login', {
                "phone_number": phone_number,
                "password": password,
            })

            alert(res)

            // fetch(`${process.env.API}/login`, {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json'
            //     },
            //     body: {
            //         "phone_number": phone_number,
            //         "password": password
            //     }
            // })
            //     .then(res => res.json())
            //     .then(data => console.log(data))
            //     .catch(error => console.log('error', error));
        } catch (error) {
            throw error;
        }
    }

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
            console.log(error);
        }
    }

    const sendOtp = async ({ phone_number }) => {
        try {
            await nextAxios.post('/otp'), {
                phone_number
            }
        } catch (error) {
            throw error;
        }
    }

    const checkOtp = async ({ phone_number, otp }) => {
        try {
            await nextAxios.post('/otp/check', {
                phone_number,
                otp,
            })
        } catch (err) {
            throw err;
        }
    }

    const values = {
        handleLogin,
        handleRegister,
        sendOtp,
        checkOtp
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

// export const AuthGuard = ({children}) => {
//     const {user, userLoading, setRedirect} = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if(!userLoading) {
//             if(!user) {
//                 setRedirect(router.isReady ? router.asPath : '/');
//                 router.push('/signin');
//             }
//         }
//     }, [userLoading, router, user, setRedirect])

// }