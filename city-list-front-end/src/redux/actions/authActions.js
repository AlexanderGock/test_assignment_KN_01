import * as api from "../../api/authApi";

export const ACTION = {
    GET_CURRENT_USER: 'GET_CURRENT_USER',
};

export const getCurrentUser = () => ({
    type: ACTION.GET_CURRENT_USER,
    payload: api.getCurrentUser(),
});

export const logout = () => {
    alert("Oops! Logout does not work.");
};
