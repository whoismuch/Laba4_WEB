import {
    SET_X,
    SET_Y,
    SET_R
} from '../actions/appActions';

const initialState = {
    x: null,
    y: null,
    r: null
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_X:
            return {...state, x: action.payload};
        case SET_Y:
            return {...state, y: action.payload};
        case SET_R:
            return {...state, r: action.payload};
    }
    return state;

}