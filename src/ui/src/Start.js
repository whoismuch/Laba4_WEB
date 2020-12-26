import React, {Component} from 'react';
import {connect} from 'react-redux'; // Component - класс из пакета react
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthenticationForm from "./components/AuthenticationForm";
import {Redirect} from "react-router-dom";
import { withRouter } from 'react-router-dom';

class Start extends Component {


    render() {
        const {header, user} = this.props;
        return (
            <div>
                {(user.isLogin  && <Redirect to={"/~s285611/lab4/public/main"}/>)}
                <Header name={header.name} surname={header.surname} variant={header.variant} group={header.group}/>
                <div className="centerBorderStart">
                    <label className="title" id="title">Необходимо авторизоваться</label>
                    <label className="title smallTitle" id="title">*Сожалею, это не моя прихоть*</label>
                    <AuthenticationForm/>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = store => {
    console.log(store.user.isLogin);
    return {
        header: store.header,
        user: store.user
    }
};



export default (withRouter(connect(mapStateToProps)(Start)));


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