import cityReducer from "../../../redux/reducers/cityReducer";
import {Map} from "immutable";
import {fulfilledFor, pendingFor, rejectedFor} from "../../../redux/promiseActionUtil";
import {ACTION as CITY_ACTIONS} from "../../../redux/actions/cityActions";
import {ACTION as CITY_LIST_ACTIONS} from "../../../redux/actions/citylistActions";

describe('test cityReducer', () => {

    describe('test GET_CITY action', () => {

        it('should handle GET_CITY_FULFILLED', () => {
            expect(
                cityReducer(new Map(), {
                    type: fulfilledFor(CITY_ACTIONS.GET_CITY),
                    meta: {
                        id: 1,
                    },
                    payload: {
                        id: 1,
                        name: "City 1",
                        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/city1.png",
                    },
                })
            ).toEqual(new Map({
                city: {
                    id: 1,
                    name: "City 1",
                    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/city1.png",
                },
                isChanged: false,
            }));
        });

    });

    describe('test CHANGE_CITY_PROPERTY action', () => {

        const OLD_CITY = {
            id: 1,
            name: 'old name',
            photo: 'old photo',
        };

        const initialState = {
            city: OLD_CITY,
            isChanged: false,
        };

        it('should handle CHANGE_CITY_PROPERTY name', () => {
            expect(
                cityReducer(new Map(initialState), {
                    type: CITY_ACTIONS.CHANGE_CITY_PROPERTY,
                    name: 'name',
                    value: 'new name',
                })
            ).toEqual(new Map({
                city: {
                    id: 1,
                    name: 'new name',
                    photo: 'old photo',
                },
                isChanged: true,
            }));
        });

        it('should handle CHANGE_CITY_PROPERTY photo', () => {
            expect(
                cityReducer(new Map(initialState), {
                    type: CITY_ACTIONS.CHANGE_CITY_PROPERTY,
                    name: 'photo',
                    value: 'new photo',
                })
            ).toEqual(new Map({
                city: {
                    id: 1,
                    name: 'old name',
                    photo: 'new photo',
                },
                isChanged: true,
            }));
        });

    });

    describe('test EDIT_CITY action', () => {

        it('should handle EDIT_CITY_PENDING', () => {
            expect(
                cityReducer(new Map(), {
                    type: pendingFor(CITY_ACTIONS.EDIT_CITY),
                    meta: {
                        id: 1,
                    },
                })
            ).toEqual(new Map({
                saveInProgress: true,
            }));
        });

        it('should handle EDIT_CITY_FULFILLED', () => {
            expect(
                cityReducer(new Map(), {
                    type: fulfilledFor(CITY_ACTIONS.EDIT_CITY),
                    meta: {
                        id: 1,
                    },
                })
            ).toEqual(new Map({
                saveInProgress: false,
                isChanged: false,
            }));
        });

        it('should handle EDIT_CITY_REJECTED', () => {
            expect(
                cityReducer(new Map(), {
                    type: rejectedFor(CITY_ACTIONS.EDIT_CITY),
                    meta: {
                        id: 1,
                    },
                })
            ).toEqual(new Map({
                saveInProgress: false,
            }));
        });

    });

    describe('test GET_CITY_LIST action', () => {

        const OLD_CITY = {
            id: 1,
            name: 'old name',
            photo: 'old photo',
        };

        const initialState = {
            city: OLD_CITY,
        };

        it('should handle GET_CITY_LIST_PENDING', () => {
            expect(
                cityReducer(new Map(initialState), {
                    type: pendingFor(CITY_LIST_ACTIONS.GET_CITY_LIST),
                    meta: {
                        page: 0,
                        name: '',
                    },
                })
            ).toEqual(new Map({

            }));
        });

    });

});
