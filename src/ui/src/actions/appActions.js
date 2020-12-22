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


    var bodyFormData = new FormData();
    bodyFormData.append('x', point.x);
    bodyFormData.append('y', point.y);
    bodyFormData.append('r', point.r);

    console.log(point.x);
    return dispatch => {
        let header = "localhost";
        axios({
            url: 'http://localhost:8999/back_end_war_exploded/api/point/check',
            data: bodyFormData,
            method: 'post',
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
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