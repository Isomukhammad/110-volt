import { createContext, useContext } from "react"
import { nextAxios, authAxios } from '../utils/axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const handleLogin = async ({ phone_number, password }) => {
        console.log(phone_number, password)
        try {
            const res = await nextAxios.post('/login', {
                "phone_number": phone_number,
                "password": password,
            })

            console.log(res);
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

    const values = {
        handleLogin
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
