export const SET_X = 'SET_X';
export const SET_Y = 'SET_Y';
export const SET_R = 'SET_R';
export const ADD_POINT = "ADD_POINT";

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

export function sendPoint(point) {


    console.log(point.x);
    return dispatch => {
        let header = "localhost";
        axios({
            url: 'http://localhost:8999/point/check',
            data: point,
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
        })
            .then(result => {
                console.log(result);
                if (result.status == 200) {
                    localStorage.setItem("loginIn", header);
                dispatch({
                    type: ADD_POINT,
                    payload: result.data,
                })
            }})
            .catch(data => console.log(data));
        dispatch({
            type: SET_X,
            payload: null,

        });
        dispatch({
            type: SET_R,
            payload: null,
        });
        document.getElementById("inp").value = "";
    }
}