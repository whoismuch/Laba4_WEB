import { combineReducers } from 'redux'
import { headerReducer} from "./header";

export const rootReducer = combineReducers({
    header: headerReducer
});