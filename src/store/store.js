import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';

import counter from './countSlicer'

const combinedReducer = combineReducers({
    counter
})

const makeStore = () =>
    configureStore({
        reducer: combinedReducer,
        middleware: getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== 'production',
    })

export const wrapper = createWrapper(makeStore);