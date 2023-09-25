import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import userReducer from './reducer/user'

const config = {
    key: 'tickitz',
    version: 1,
    storage
}

const reducers = combineReducers({
    user: userReducer
})

const defaultmiddleware = (defaultMiddleware) => defaultMiddleware({ serializableCheck: { ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } })

const confstore = configureStore({
    reducer: persistReducer(config, reducers),
    middleware: defaultmiddleware
})

export default confstore