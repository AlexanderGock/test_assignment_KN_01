import promiseMiddleware from "redux-promise-middleware";
import { configureStore } from "@reduxjs/toolkit";
import citylistReducer from "./reducers/citylistReducer";
import cityReducer from "./reducers/cityReducer";
import authReducer from "./reducers/authReducer";
import errorReducer from "./reducers/errorReducer";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

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
            city: cityReducer,
            auth: authReducer,
            error: errorReducer,
        },
        middleware: addPromiseAndThunkMiddleware,
        devTools: !IS_PRODUCTION,
    });
};
