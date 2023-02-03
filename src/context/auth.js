import axios from "axios"
import { createContext, useContext } from "react"
import { nextAxios, authAxios } from '../utils/axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const handleLogin = async ({ phone_number, password }) => {
        try {
            // const res = await nextAxios.post('/login', {
            //     phone_number: phone_number,
            //     password: password,
            // })

            const res = await axios.post(process.env.API + '/login', {
                phone_number: phone_number,
                password: password
            },
                {
                    headers: {

                    }
                })

            console.log(res);
            // let myHeaders = new Headers();
            // myHeaders.append("Accept", "application/json");

            // const requestOptions = {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: {
            //         "phone_number": phone_number,
            //         "password": password
            //     },
            //     redirect: 'follow'
            // }

            // const res = fetch("https://shop.inweb.uz/api/v2/login", requestOptions)
            //     .then(response => response.text())
            //     .then(result => console.log(result))
            //     .catch(error => console.log('error', error));
        } catch (err) {
            throw err;
        }
    }

    const values = {
        handleLogin
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
