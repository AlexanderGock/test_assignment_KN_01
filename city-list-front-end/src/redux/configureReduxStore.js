import promiseMiddleware from "redux-promise-middleware";
import { configureStore } from "@reduxjs/toolkit";
import citylistReducer from "./reducers/citylistReducer";

export default function configureReduxStore() {
    const addPromiseAndThunkMiddleware = (curriedGetDefaultMiddleware) => {
        const defaultMiddleware = curriedGetDefaultMiddleware({
            thunk: true,
            immutableCheck: false,
            serializableCheck: false,
        });
        defaultMiddleware.push(promiseMiddleware);
        return defaultMiddleware;
    };

    return configureStore({
        reducer: {
            citylist: citylistReducer,
        },
        middleware: addPromiseAndThunkMiddleware,
    });
};
