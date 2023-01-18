import React from "react";
import CityEdit from "../../../components/city/CityEdit";
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import {Map} from "immutable";
import {render, screen} from "@testing-library/react";

const mockStore = configureStore([]);

describe('Test CityEdit component', () => {

    const city = new Map({
        city: {id: 1, name: 'name', photo: 'photo'},
        isChanged: false,
        saveInProgress: false,
    });

    const userWithAllowEditRole = new Map({
        user: {
            username: "user",
            authorities: [
                {authority: "ROLE_ALLOW_EDIT"},
            ],
        },
    });

    it('should render CircularProgress only', () => {
        const store = mockStore({
            city: new Map(),
            auth: new Map(),
            error: new Map(),
            citylist: new Map(),
        });

        const {container} = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityEdit/>
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should render city fields', () => {
        const store = mockStore({
            city: city,
            auth: new Map(),
            error: new Map(),
            citylist: new Map(),
        });

        const {container} = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityEdit/>
                </BrowserRouter>
            </Provider>
        );

        const inputElements = container.getElementsByTagName('input');
        expect(inputElements).toBeDefined();
        expect(inputElements.length).toBe(2);

        const buttonElements = container.getElementsByTagName('button');
        expect(buttonElements).toBeDefined();
        expect(buttonElements.length).toBe(1);
    });

    it('should render city fields for user with ROLE_ALLOW_EDIT', () => {
        const store = mockStore({
            city: city,
            auth: userWithAllowEditRole,
            error: new Map(),
            citylist: new Map(),
        });

        const {container} = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CityEdit/>
                </BrowserRouter>
            </Provider>
        );

        const inputElements = container.getElementsByTagName('input');
        expect(inputElements).toBeDefined();
        expect(inputElements.length).toBe(2);

        const buttonElements = container.getElementsByTagName('button');
        expect(buttonElements).toBeDefined();
        expect(buttonElements.length).toBe(2);
    });

});
