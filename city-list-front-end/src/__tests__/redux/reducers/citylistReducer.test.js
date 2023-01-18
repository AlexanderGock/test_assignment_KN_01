import citylistReducer from "../../../redux/reducers/citylistReducer";
import {fulfilledFor, pendingFor, rejectedFor} from "../../../redux/promiseActionUtil";
import {ACTION as CITY_LIST_ACTIONS} from "../../../redux/actions/citylistActions";
import {Map} from "immutable";

const CITY_LIST_RESPONSE = {
    "content": [
        {
            "id": 1,
            "name": "City 1",
            "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/city1.png",
        },
        {
            "id": 2,
            "name": "City 2",
            "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/city2.jpg",
        },
    ],
    "pageable": {
        "sort": {
            "empty": false,
            "sorted": true,
            "unsorted": false,
        },
        "offset": 10,
        "pageSize": 10,
        "pageNumber": 1,
        "unpaged": false,
        "paged": true,
    },
    "last": true,
    "totalPages": 2,
    "totalElements": 12,
    "size": 10,
    "number": 0,
    "sort": {
        "empty": false,
        "sorted": true,
        "unsorted": false,
    },
    "first": false,
    "numberOfElements": 2,
    "empty": false,
};

describe('test citylistReducer', () => {

    describe('test GET_CITY_LIST action', () => {

        it('should handle GET_CITY_LIST_PENDING', () => {
            expect(
                citylistReducer(new Map(), {
                    type: pendingFor(CITY_LIST_ACTIONS.GET_CITY_LIST),
                    meta: {
                        page: 1,
                        name: '',
                    },
                })
            ).toEqual(new Map({
                getCityListInProgress: true,
            }));
        });

        it('should handle GET_CITY_LIST_FULFILLED', () => {
            expect(
                citylistReducer(new Map(), {
                    type: fulfilledFor(CITY_LIST_ACTIONS.GET_CITY_LIST),
                    meta: {
                        page: 1,
                        name: '',
                    },
                    payload: CITY_LIST_RESPONSE
                })
            ).toEqual(new Map({
                getCityListInProgress: false,
                citylist: CITY_LIST_RESPONSE.content,
                pagination: {
                    page: 1,
                    pageSize: 10,
                    first: false,
                    last: true,
                    totalPages: 2,
                    totalElements: 12,
                }
            }));
        });

        it('should handle GET_CITY_LIST_REJECTED', () => {
            expect(
                citylistReducer(new Map(), {
                    type: rejectedFor(CITY_LIST_ACTIONS.GET_CITY_LIST),
                    meta: {
                        page: 1,
                        name: '',
                    },
                })
            ).toEqual(new Map({
                getCityListInProgress: false,
            }));
        });

    });

    describe('test CHANGE_FILTER action', () => {

        it('should handle CHANGE_FILTER', () => {
            expect(
                citylistReducer(new Map(), {
                    type: CITY_LIST_ACTIONS.CHANGE_FILTER,
                    propName: 'name',
                    value: 'new value',
                })
            ).toEqual(new Map({
                filter: {
                    name: 'new value',
                },
            }));
        });

    });

});
