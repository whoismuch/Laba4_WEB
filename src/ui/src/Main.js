import React, {Component} from 'react';
import {connect} from 'react-redux'; // Component - класс из пакета react
import './index.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PointForm from "./components/PointForm";
import Graphic from "./components/Graphic";
import Table from "./components/Table";
import {getPoints} from "./actions/appActions";
import {Link, NavLink, Redirect} from "react-router-dom";
import arrow from "../public/images/strelkaWithoutBackground.png"
import Start from "./Start";
import {setAnswer, setSignIn} from "./actions/userActions";
import {withRouter} from 'react-router-dom';


class Main extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.getPoints();
    }

    getPoints() {
        this.props.getPoints();
    }


    logout() {
        this.props.setAnswer('');
        this.props.setSignIn(false);
        localStorage.setItem("loginIn", undefined);
    }

    render() {
        const {header} = this.props;
        return (
            <div>
                <div className="linkToPrevious">
                    <NavLink onClick={this.logout} to="/~s285611/lab4/public/" >
                        <img src={arrow} alt="arrow" width="80" height="50"/>
                    </NavLink>
                </div>
                <Header name={header.name} surname={header.surname} variant={header.variant} group={header.group}/>
                <div className="centerBorderMain">
                    <div className="formAndGraphic">
                        <PointForm/>
                        <Graphic/>
                    </div>
                    <Table/>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        app: store.app,
        header: store.header,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getPoints: () => dispatch(getPoints()),
        setSignIn: (logIn) => dispatch(setSignIn(logIn)),
        setAnswer: (answer) => dispatch(setAnswer(answer))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));


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