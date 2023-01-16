import {Map} from "immutable";
import {fulfilledFor, pendingFor, rejectedFor} from "../promiseActionUtil";
import {ACTION} from "../actions/cityActions";

const initialState = new Map({
    citylist: [],
});

export default function cityReducer(state = initialState, action) {
    switch (action.type) {
        case pendingFor(ACTION.GET_CITY_LIST): {
            return state;
        }
        case fulfilledFor(ACTION.GET_CITY_LIST): {
            return state.set('citylist', action.payload.content);
        }
        case rejectedFor(ACTION.GET_CITY_LIST): {
            return state;
        }
        default:
            return state;
    }
};
