import promiseMiddleware from "redux-promise-middleware";
import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./reducers/cityReducer";

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
            city: cityReducer,
        },
        middleware: addPromiseAndThunkMiddleware,
    });
};
