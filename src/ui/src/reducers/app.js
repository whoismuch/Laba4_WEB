import {
    SET_X,
    SET_Y,
    SET_R, ADD_POINT, SET_TABLE, SET_ANSWER
} from '../actions/appActions';

const initialState = {
    x: null,
    y: null,
    r: null,
    answer: '',
    table: []
};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_X:
            return {...state, x: action.payload};
        case SET_Y:
            return {...state, y: action.payload};
        case SET_R:
            return {...state, r: action.payload};
        case ADD_POINT:
            return {...state, table: [...state.table, action.payload]};
        case SET_TABLE:
            return {...state, table: action.payload};
        case SET_ANSWER:
            return {...state, answer: action.payload}

    }
    return state;

}