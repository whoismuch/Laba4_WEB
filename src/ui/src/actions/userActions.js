import axios from 'axios';
import {SET_R, SET_X} from "./appActions";

export const LOGIN = 'LOGIN';
export const SET_LOGIN = 'SET_LOGIN';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_ANSWER = 'SET_ANSWER';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_SIGN_IN = "SET_SIGN_IN";


export function setLogin(login) {
    return {
        type: SET_LOGIN,
        payload: login
    }
}

export function setAnswer(answer) {
    return {
        type: SET_ANSWER,
        payload: answer
    }
}

export function setPassword(password) {
    return {
        type: SET_PASSWORD,
        payload: password
    }
}

export function registration(user, event) {

    event.preventDefault(event);

    let bodyFormData = new FormData();
    bodyFormData.append('login', user.login);
    bodyFormData.append('password', user.password);

    console.log("я отправляю данные");
    return dispatch => {
        axios({
            method: "post",
            url: 'http://localhost:11200/back_end_war_exploded/api/user/signUp',
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(result => {
                console.log("я заебалась");
                console.log(result.status);
                if (result.data) {
                    console.log("я устанвливаю токен");
                    localStorage.setItem("loginIn", user.login);
                    dispatch({
                        type: SET_ANSWER,
                        payload: "Вы успешно зарегистрировались"
                    });
                    dispatch({
                        type: SET_SIGN_IN,
                        payload: true
                    })
                } else {
                    dispatch({
                        type: SET_ANSWER,
                        payload: "Пользователь с таким логином уже зарегистрирован",
                    });
                }
            })
            .catch(result => {
                console.log(result);
                dispatch({
                    type: SET_ANSWER,
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

export function login(user, event) {

    event.preventDefault(event);

    let bodyFormData = new FormData();
    bodyFormData.append('login', user.login);
    bodyFormData.append('password', user.password);

    console.log("я отправляю данные логин ");
    return dispatch => {
        axios({
            method: "post",
            url: 'http://localhost:11200/back_end_war_exploded/api/user/signIn',
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(result => {
                console.log("я заебалась, но это уже логин");
                console.log(result.status);
                if (result.data) {
                    console.log("я устанвливаю токен логин");
                    localStorage.setItem("loginIn", user.login);
                    dispatch({
                        type: SET_ANSWER,
                        payload: "Вход в систему успешно выполнен"
                    });
                    dispatch({
                        type: SET_SIGN_IN,
                        payload: true
                    })
                } else {
                    dispatch({
                        type: SET_ANSWER,
                        payload: "Введен неправильный пароль или логин",
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

export function setSignIn(isLogin) {
    return {
        type: SET_SIGN_IN,
        payload: isLogin
    }
}