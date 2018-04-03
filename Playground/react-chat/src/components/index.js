import React from "react";
import {Provider} from "react-redux";
import App from "./App";
import {createStore} from "redux";
import {reducer} from "../chat/chatDuck";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);