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
            url: 'http://localhost:11200/back_end_war_exploded/api/users/registration/' + user.login,
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(result => {
                console.log("я заебалась");
                console.log(result.status);
                let header = 'Basic ' + btoa(user.login + ':' + user.password);
                if (result.data) {
                    console.log("я устанвливаю токен");
                    localStorage.setItem("user", header);
                    localStorage.setItem("login", user.login);
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
            .catch(error => {
                let status = error.response.status;
                console.log(error.response.status);
                let answer = 'Error';
                if (status === 415 || status === 400 ) answer = 'Мб данные в нормальном виде отправите?';
                if (status === 401) answer = 'Вы не прошли аунтефикацию';
                if (status === 404) answer = 'Потеряно соединение';

                dispatch({
                    type: SET_ANSWER,
                    payload: answer,
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
        dispatch({
            type: SET_R,
            payload: null
        });

    }
}

export function login(user, event) {

    event.preventDefault(event);

    let header = 'Basic ' + btoa(user.login + ':' + user.password);

    console.log("я отправляю данные логин ");
    return dispatch => {
        axios({
            method: "post",
            url: 'http://localhost:11200/back_end_war_exploded/api/users/login/' + user.login,
            headers: {
                'Authorization': header
            }
        })
            .then(result => {
                console.log("я заебалась, но это уже логин");
                console.log(result.status);
                if (result.data) {
                    console.log("я устанвливаю токен логин");
                    localStorage.setItem("user", header);
                    localStorage.setItem("login", user.login);
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
            .catch(error => {
                let status = error.response.status;
                console.log(error.response.status);
                let answer = 'Error';
                if (status === 415 || status === 400 ) answer = 'Мб данные в нормальном виде отправите?';
                if (status === 401) answer = 'Вы не прошли аунтефикацию';
                if (status === 404) answer = 'Потеряно соединение';

                dispatch({
                    type: SET_ANSWER,
                    payload: answer,
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
        dispatch({
            type: SET_R,
            payload: null
        });
    }
}

export function setSignIn(isLogin) {
    return {
        type: SET_SIGN_IN,
        payload: isLogin
    }
}