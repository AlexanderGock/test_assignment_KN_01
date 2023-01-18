import {isRejected} from "../promiseActionUtil";
import {Map} from "immutable";
import {ACTION} from "../actions/errorActions";

const initialState = new Map({
    error: undefined,
});

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case (ACTION.CLEAN_ERROR):
            return state.remove('error');

        default: {
            if (isRejected(action.type)) {
                return state.set('error', action.payload);
            }

            return state;
        }
    }
};
