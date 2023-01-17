import * as api from "../../api/cityApi";
import {citySelector, saveInProgressSelector} from "../selectors";

export const ACTION = {
    GET_CITY: 'GET_CITY',
    CHANGE_CITY_PROPERTY: 'CHANGE_CITY_PROPERTY',
    EDIT_CITY: 'EDIT_CITY',
};

export const getCity = (id) => ({
    type: ACTION.GET_CITY,
    payload: api.getCity(id),
    meta: {id},
});

export const changeCityProperty = (name, value) => ({
    type: ACTION.CHANGE_CITY_PROPERTY,
    name,
    value,
});

export const editCity = () => (dispatch, getState) => {
    const saveInProgress = saveInProgressSelector(getState());
    if (saveInProgress) {
        return;
    }

    const city = citySelector(getState());

    return dispatch({
        type: ACTION.EDIT_CITY,
        payload: api.editCity(city.id, city),
        meta: {id: city.id, city},
    });
};
