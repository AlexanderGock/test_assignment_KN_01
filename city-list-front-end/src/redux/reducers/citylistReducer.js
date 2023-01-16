import {Map} from "immutable";
import {fulfilledFor, pendingFor, rejectedFor} from "../promiseActionUtil";
import {ACTION} from "../actions/citylistActions";

const initialState = new Map({
    citylist: [],
    getCityListInProgress: false,

    pagination: {
        page: 0,
        pageSize: 0,
        first: true,
        last: true,
        totalPages: 0,
        totalElements: 0,
    },

    filter: {
        name: '',
    }
});

export default function citylistReducer(state = initialState, action) {
    switch (action.type) {
        case pendingFor(ACTION.GET_CITY_LIST): {
            return state.set('getCityListInProgress', true);
        }
        case fulfilledFor(ACTION.GET_CITY_LIST): {
            const pagination = {
                page: action.payload.pageable.pageNumber,
                pageSize: action.payload.pageable.pageSize,
                first: action.payload.first,
                last: action.payload.last,
                totalPages: action.payload.totalPages,
                totalElements: action.payload.totalElements,
            };
            return state.set('citylist', action.payload.content)
                .set('pagination', pagination)
                .set('getCityListInProgress', false);
        }
        case rejectedFor(ACTION.GET_CITY_LIST): {
            return state.set('getCityListInProgress', false);
        }

        case ACTION.CHANGE_FILTER: {
            return state.set('filter', {...state.get('filter'), [action.propName]: action.value});
        }

        default:
            return state;
    }
};
