import * as api from "../../api/cityApi";
import {cityListFilterSelector, cityListPaginationSelector} from "../selectors";
import {debounce} from "lodash";

export const ACTION = {
    GET_CITY_LIST: 'GET_CITY_LIST',
    CHANGE_FILTER: 'CHANGE_FILTER',
};

const CITI_LIST_FILTER_DELAY = 500;

export const getCityList = (page, name) => (dispatch, getState) => {
    const cityName = name || cityListFilterSelector(getState()).name;
    const pageToShow = (page !== undefined) ? page : cityListPaginationSelector(getState()).page;

    return dispatch({
        type: ACTION.GET_CITY_LIST,
        payload: api.getCityList(pageToShow, cityName),
        meta: {page: pageToShow, name: cityName},
    });
};

const applyNewFilter = debounce((dispatch, getState) => {
    return getCityList(0)(dispatch, getState);
}, CITI_LIST_FILTER_DELAY);

export const changeFilter = (propName, value) => (dispatch, getState) => {
    applyNewFilter(dispatch, getState);

    return dispatch({
        type: ACTION.CHANGE_FILTER,
        propName,
        value,
    });
};
