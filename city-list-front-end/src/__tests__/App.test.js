import {render} from "@testing-library/react";
import App from "../App";
import {Map} from "immutable";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe('Test App component', () => {

    let store;

    beforeEach(() => {
        store = mockStore({
            city: new Map({
                city: {id: 1, name: 'name', photo: 'photo'},
                isChanged: false,
                saveInProgress: false,
            }),
            auth: new Map(),
            error: new Map(),
            citylist: new Map({
                filter: {},
                citylist: [],
                pagination: {
                    page: 0,
                    pageSize: 0,
                    first: true,
                    last: true,
                    totalPages: 0,
                    totalElements: 0,
                },
            }),
        });

        store.dispatch = jest.fn();
    });

    it('should render', () => {
        const {container} = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        const mainContainers = container.getElementsByClassName('MuiContainer-maxWidthLg');
        expect(mainContainers).toBeDefined();
        expect(mainContainers.length).toBe(1);
    });

});
