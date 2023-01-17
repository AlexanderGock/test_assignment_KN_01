import {Map} from "immutable";
import {fulfilledFor, pendingFor, rejectedFor} from "../promiseActionUtil";
import {ACTION} from "../actions/cityActions";
import {ACTION as CITY_LIST_ACTION} from "../actions/citylistActions";

const initialState = new Map({
    city: undefined,
    isChanged: false,
    saveInProgress: false,
});

export default function cityReducer(state = initialState, action) {
    switch (action.type) {
        case fulfilledFor(ACTION.GET_CITY): {
            return state.set('city', action.payload)
                .set('isChanged', false);
        }

        case ACTION.CHANGE_CITY_PROPERTY:
            return state.set('city', {...state.get('city'), [action.name]: action.value})
                .set('isChanged', true);

        case pendingFor(ACTION.EDIT_CITY):
            return state.set('saveInProgress', true);
        case fulfilledFor(ACTION.EDIT_CITY):
            return state.set('saveInProgress', false)
                .set('isChanged', false);
        case rejectedFor(ACTION.EDIT_CITY):
            return state.set('saveInProgress', false);

        case pendingFor(CITY_LIST_ACTION.GET_CITY_LIST):
            return state.remove('city');

        default:
            return state;
    }
};
