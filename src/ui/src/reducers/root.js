import { combineReducers } from 'redux'
import { headerReducer} from "./header";
import {appReducer} from "./app";
import {userReducer} from "./user";

export const rootReducer = combineReducers({
    header: headerReducer,
    app: appReducer,
    user: userReducer
});