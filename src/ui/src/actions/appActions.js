import {login} from "./userActions";

export const SET_X = 'SET_X';
export const SET_Y = 'SET_Y';
export const SET_R = 'SET_R';
export const ADD_POINT = "ADD_POINT";
export const SET_TABLE = "SET_TABLE";
export const SET_ANSWER = "SET_ANSWER";

import axios from 'axios';

export function setR(R) {
    return {
        type: SET_R,
        payload: R
    }
}

export function setX(X) {
    return {
        type: SET_X,
        payload: X
    }
}

export function setY(Y) {
    return {
        type: SET_Y,
        payload: Y
    }
}

export function setAnswer(answer) {
    return {
        type: SET_ANSWER,
        payload: answer
    }
}
export function sendPoint(point) {


    let bodyFormData = new FormData();
    bodyFormData.append('x', point.x);
    bodyFormData.append('y', point.y);
    bodyFormData.append('r', point.r);

    return dispatch => {
        axios({
            url: 'http://localhost:8999/back_end_war_exploded/api/point-manager/new-point/' + localStorage.getItem("login"),
            data: bodyFormData,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem("user")
            }
        })
            .then(result => {
                console.log(result.data);
                if (result.data != null) {
                    dispatch({
                        type: SET_TABLE,
                        payload: result.data,
                    })
                } else {
                    dispatch({
                        type: SET_ANSWER,
                        payload: "Обмануть меня вздумали?"
                    })
                }
            })
            .catch(data => {
                dispatch({
                    type: SET_ANSWER,
                    payload: "Потеряно соединение"
                });
                console.log(data)
            });
        dispatch({
            type: SET_X,
            payload: null,
        });
        document.getElementById("inp").value = "";
    }
}

export function getPoints() {
    console.log("I get points");
    return dispatch => {
        axios({
            url: 'http://localhost:8999/back_end_war_exploded/api/point-manager/points-list/' + localStorage.getItem("login"),
            method: 'get',
            headers: {
                'Authorization': localStorage.getItem("user")
            }
        }).then(data => {
            dispatch({
                type: SET_TABLE,
                payload: data.data
            })
        }).catch(data => {
            dispatch({
                type: SET_ANSWER,
                payload: "Потеряно соединение"
            });
            console.log(data)
        });
    }

}