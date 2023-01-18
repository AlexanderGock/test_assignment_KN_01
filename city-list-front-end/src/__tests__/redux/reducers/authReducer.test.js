import authReducer from "../../../redux/reducers/authReducer";
import {fulfilledFor} from "../../../redux/promiseActionUtil";
import {ACTION as AUTH_ACTIONS} from "../../../redux/actions/authActions";
import {Map} from "immutable";

describe('test authReducer', () => {
    it('should handle GET_CURRENT_USER_FULFILLED', () => {
        expect(
            authReducer(new Map(), {
                type: fulfilledFor(AUTH_ACTIONS.GET_CURRENT_USER),
                payload: {
                    username: 'username',
                    authorities: [
                        {"authority":"ROLE_READ_ONLY"},
                    ],
                    accountNonExpired: true,
                },
            })
        ).toEqual(new Map({
            user: {
                username: 'username',
                authorities: [
                    {"authority": "ROLE_READ_ONLY"},
                ],
                accountNonExpired: true,
            }
        }));
    });
});
