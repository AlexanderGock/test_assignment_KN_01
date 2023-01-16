import {get, put} from "./restApi";
import {getEditCityUrl, getGetCityListUrl} from "./urlResolver";

export const getCityList = (page, name) => {
    return get(getGetCityListUrl(), {page, name});
};

export const editCity = (id, city) => {
    return put(getEditCityUrl(id), city);
};
