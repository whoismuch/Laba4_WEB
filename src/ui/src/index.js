import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from "./store/store";

import './index.css';
import App from "./App";



ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
)
;




// const initialState = [
//     'red', 'green'
// ];
//
// function main(state = initialState, action) {
//     if (action.type === 'ADD_POINT') {
//         return [
//             ...state,
//             action.point
//         ];
//     }
//     return state;
// }

// const store = createStore(main); //Функция main называется reducer


// import {createStore} from "redux";
//
// function main(state = [], action) {
//     if (action.type === 'ADD_POINT') {
//         return [
//             ...state, // оператор spread ... (чтобы добавить значение в массив и вернуть новый массив)
//                         //  так как store иммутабельный -> мы можем только создавать всегда новую копию данных, а не менять состояние store
//             action.point
//         ];
//     }
//     return state;
// }
// const store = createStore(main); // на вход нужно передать функцию, которая будет изменять store
//
// store.subscribe(() => {   // подписываемся на изменение store
//     console.log('subscribe', store.getState());
// });
//
// store.dispatch({type: 'ADD_POINT', point: 'red point'}); // единственный способ поменять значение в store
// store.dispatch({type: 'ADD_POINT', point: 'green point'}); // dispatch - событие, type - тип этого события