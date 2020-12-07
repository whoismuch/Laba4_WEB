import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { HashRouter as Router, Route} from 'react-router-dom';

import './index.css';
import Start from './Start';
import Main from './Main';


const initialState = [
  'red', 'green'
];

function main(state = initialState, action) {
    if (action.type === 'ADD_POINT') {
        return [
            ...state,
            action.point
        ];
    }
    return state;
}

const store = createStore(main); //Функция main называется reducer

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={Start}/>
            <Route path="/main" component={Main}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);



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