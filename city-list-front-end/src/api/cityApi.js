import {get, put} from "./restApi";
import {getEditCityUrl, getGetCityListUrl, getGetCityUrl} from "./urlResolver";

export const getCityList = (page, name) => {
    return get(getGetCityListUrl(), {page, name});
};

export const editCity = (id, city) => {
    return put(getEditCityUrl(id), city);
};

export const getCity = (id) => {
    return get(getGetCityUrl(id));
};
