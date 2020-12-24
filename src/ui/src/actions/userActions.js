import axios from 'axios';
import {SET_R, SET_X} from "./appActions";

export const LOGIN = 'LOGIN';
export const SET_LOGIN = 'SET_LOGIN';
export const SET_PASSWORD= 'SET_PASSWORD';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_SIGN_IN = "SET_SIGN_IN";


export function setLogin(login) {
    return {
        type: SET_LOGIN,
        payload: login
    }
}

export function setPassword(password) {
    return {
        type: SET_PASSWORD,
        payload: password
    }
}

export function registration(user) {

    let bodyFormData = new FormData();
    bodyFormData.append('login', user.login);
    bodyFormData.append('password', user.password);

    return dispatch => {
        axios({
            method: "post",
            url: 'http://localhost:8999/back_end_war_exploded/api/user/signUp',
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(result => {
                console.log(result);
                if (Number(result.status) === 204) {
                    dispatch({
                        type: REGISTER,
                        payload: "Вы успешно зарегистрировались"
                    })
                } else {
                    dispatch({
                        type: REGISTER,
                        payload: "Пользователь с таким логином уже зарегистрирован",
                    });
                }
            })
            .catch(result => {
                console.log(result);
                dispatch({
                    type: REGISTER,
                    payload: "Потеряно соединение",
                });
            });
        dispatch({
            type: SET_LOGIN,
            payload: '',

        });
        dispatch({
            type: SET_PASSWORD,
            payload: '',
        });

    }
}