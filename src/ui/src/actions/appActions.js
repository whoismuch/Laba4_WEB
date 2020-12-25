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


    let bodyFormData = new FormData();
    bodyFormData.append('x', point.x);
    bodyFormData.append('y', point.y);
    bodyFormData.append('r', point.r);

    return dispatch => {
        axios({
            url: 'http://localhost:8999/back_end_war_exploded/api/point/check',
            data: bodyFormData,
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(result => {
                console.log(result.data);
                if (result.data != null) {
                let fullPoint = {
                    x: point.x,
                    y: point.y,
                    r: point.r,
                    res: result.data
                };
                dispatch({
                    type: ADD_POINT,
                    payload: fullPoint,
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