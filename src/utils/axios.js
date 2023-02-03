import axios from 'axios'

export const nextAxios = axios.create({
    baseURL: process.env.API,
    headers: {
        Accept: 'application/json'
    }
})

export const authAxios = axios.create({
    baseURL: process.env.API,
    headers: {
        Accept: 'application/json'
    }
})