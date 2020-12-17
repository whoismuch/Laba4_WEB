export const SET_X = 'SET_X';
export const SET_Y = 'SET_Y';
export const SET_R = 'SET_R';
export const ADD_POINT = "ADD_POINT";



export function setR(R) {
    return{
        type: SET_R,
        payload: R
    }
}

export function setX(X) {
    return{
        type: SET_X,
        payload: X
    }
}

export function setY(Y) {
    return{
        type: SET_Y,
        payload: Y
    }
}

export function sendPoint(butch){
    return dispatch => {
        let header = localStorage.getItem("loginIn");
        axios({
            url: 'http://localhost:8080/table',
            data: butch,
            method: 'post',
            headers: {
                Authorization: header,
            },
        })
            .then(data => {
                console.log(data);
                dispatch({
                    type: ADD_DOT,
                    payload: data.data,
                })
            })
            .catch(data => console.log(data));
        dispatch({
            type: SET_X,
            payload: null,
        });
        dispatch({
            type: SET_Y,
            payload: null,
        });
        document.getElementById("Y").value = "";
    }
}