import * as api from "../../api/cityApi";

export const ACTION = {
    GET_CITY_LIST: 'GET_CITY_LIST',
};

export const getCityList = (page, name) => ({
    type: ACTION.GET_CITY_LIST,
    payload: api.getCityList(page, name),
    meta: {page, name},
});
