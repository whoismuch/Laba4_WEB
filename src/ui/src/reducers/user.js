import {
    LOGIN,
    LOGOUT,
    REGISTER,
    SET_SIGN_IN,
    SET_LOGIN,
    SET_PASSWORD
} from "../actions/userActions";

const initialState = {
    login: '',
    password: '',
    isLogin: false,
    userAnswer: ""
};


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER:
            return {...state, userAnswer: action.payload};
        case LOGIN:
            return {...state, userAnswer: action.payload};
        case LOGOUT:
            return {...state, isLogin: action.payload,};
        case SET_SIGN_IN:
            return {...state, isLogin: action.payload};
        case SET_LOGIN:
            return {...state, login: action.payload};
        case SET_PASSWORD:
            return {...state, password: action.payload};
        default:
            return state;
    }

}