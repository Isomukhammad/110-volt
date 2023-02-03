import { createContext, useContext } from "react"
import { nextAxios, authAxios } from '../utils/axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const handleLogin = async ({ phone_number, password }) => {
        try {
            const res = await nextAxios.post('/login', {
                phone_number,
                password,
            })

            console.log(res);
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
