import React, {Component} from 'react';

import './App.css';
// import {hashHistory, Route, Router} from "react-router";
import {BrowserRouter, Switch, Route} from "react-router-dom";
// import {Switch, Route, Router} from "react-router"
import Start from "./Start";
import Main from "./Main";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {setSignIn} from "./actions/userActions";

// import {setSignIn} from "./actions/userActions";

class App extends Component {

    constructor(props) {
        super(props);
        // console.log(localStorage.getItem("loginIn"));
        // localStorage.setItem("loginIn", undefined);
        // this.props.setSignIn(false);
        // console.log(localStorage.getItem("loginIn"));
        if (localStorage.getItem("loginIn") != null && localStorage.getItem("loginIn") !== "undefined") {
            this.props.setSignIn(true)
        } else {
            this.props.setSignIn(false)
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/~s285611/lab4/public/" component={Start}/>
                        <Route path="/~s285611/lab4/public/main" component={Main}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
};

const mapStateToProps = store => {
    return {
        app: store.app,
        user: store.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setSignIn: flag => dispatch(setSignIn(flag)),
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(App));
//
//     addPoint() {
//         console.log('addPoint', this.trackInput.value);
//         this.props.onAddPoint(this.trackInput.value);
//         this.trackInput.value = '';
//
//     }
//
//     render() {
//         console.log(this.props.testStore)
//         return (
//             <div>
//
//                 <input type="text" ref={(input) => {this.trackInput = input}}/>
//                 <button onClick={this.addPoint.bind(this)}>Add track</button>
//                 <ul>
//                     {this.props.testStore.map((track, index) =>
//                     <li key={index}>{track}</li>
//                     )}
//                 </ul>
//             </div>
//         );
//     }
// }
//
// export default connect(
//     state => ({ //state - глобальное состояние store'а
//         testStore: state
//     }),
//     dispatch => ({
//         onAddPoint: (pointName) => {
//             dispatch({type: 'ADD_POINT', point: pointName})
//         }
//     })
// )(App);


// HTML разметка, это ненормально для JS файла и такой JS файл невалидный.
//На самом деле это не чистый JS файл. Это специальный JSX синтаксис, который позволяет писать HTML в файлах JS
// код c JSX не выполняется в браузере, а транспалится в валидный JS и после этого уже выполняется браузером

//flow react - state, props
//ref -  ссылка на DOM-элемент (Возможность доступа к DOM-элементам из React'а), но нужно помнить, что если мы навешиваем что-то на эти элементы
//  (jquery), то react об этом знать не будет
// поэтому refs лучше использовать с осторожностью, и стараться не использовать их, если можно использовать props и state

// <div>
//     <input type="text" placeholder="test" ref={(input) => this.testInput = input}/>
//     <button onClick={this.submit.bind(this)}>Submit</button>
// </div>