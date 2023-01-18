import {Map} from "immutable";
import {fulfilledFor} from "../promiseActionUtil";
import {ACTION} from "../actions/authActions";

const initialState = new Map({
    user: undefined,
});

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case fulfilledFor(ACTION.GET_CURRENT_USER):
            return state.set('user', action.payload);

        default:
            return state;
    }
};
