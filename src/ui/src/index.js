import React from 'react';
import ReactDOM from 'react-dom';
// import theme from 'assets/react-toolbox/theme';
// import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Router, Route, hashHistory} from 'react-router';

import './index.css';
import Start from './Start';
import Main from './Main';
import Test from './Test';

const contextTheme = {
    // RTDropdown: require('react-toolbox/lib/dropdown/style.scss'),
};

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
    <Router history={hashHistory}>
        <Route exact path="/" component={Start}/>
        <Route path="/main" component={Main}/>
        <Route path="/test" component={Test}/>
    </Router>,
document.getElementById('root')
)
;


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