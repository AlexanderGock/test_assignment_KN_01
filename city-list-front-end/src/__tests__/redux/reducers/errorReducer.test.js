import errorReducer from "../../../redux/reducers/errorReducer";
import {Map} from "immutable";
import {rejectedFor} from "../../../redux/promiseActionUtil";
import {ACTION as ERROR_ACTIONS} from "../../../redux/actions/errorActions";
import {ACTION as CITY_ACTIONS} from "../../../redux/actions/cityActions";
import {ACTION as CITY_LIST_ACTIONS} from "../../../redux/actions/citylistActions";

describe('test errorReducer', () => {

    describe('test CLEAN_ERROR action', () => {

        const initialState = {
            error: {
                status: 400,
                error: "Error message",
            }
        };

        it('should handle CLEAN_ERROR', () => {
            expect(
                errorReducer(new Map(initialState), {
                    type: ERROR_ACTIONS.CLEAN_ERROR,
                })
            ).toEqual(new Map({

            }));
        });

    });

    describe('test *_REJECTED action', () => {

        it('should handle GET_CITY_REJECTED', () => {
            expect(
                errorReducer(new Map(), {
                    type: rejectedFor(CITY_ACTIONS.GET_CITY),
                    meta: {
                        id: 1234,
                    },
                    payload: {
                        status: 404,
                        error: "Error message",
                    }
                })
            ).toEqual(new Map({
                error: {
                    status: 404,
                    error: "Error message",
                }
            }));
        });

        it('should handle GET_CITY_LIST_REJECTED', () => {
            expect(
                errorReducer(new Map(), {
                    type: rejectedFor(CITY_LIST_ACTIONS.GET_CITY_LIST),
                    meta: {
                        page: 3,
                        name: 'ba',
                    },
                    payload: {
                        status: 404,
                        error: "Error message",
                    }
                })
            ).toEqual(new Map({
                error: {
                    status: 404,
                    error: "Error message",
                }
            }));
        });

    });

});
