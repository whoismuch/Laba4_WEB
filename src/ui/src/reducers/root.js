import { combineReducers } from 'redux'
import { headerReducer} from "./header";
import {appReducer} from "./app";

export const rootReducer = combineReducers({
    header: headerReducer,
    app: appReducer
});