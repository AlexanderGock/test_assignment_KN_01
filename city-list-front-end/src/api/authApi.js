import {get} from "./restApi";
import {getGetCurrentUserUrl} from "./urlResolver";

export const getCurrentUser = () => {
    return get(getGetCurrentUserUrl());
};
