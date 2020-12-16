import React, {Component} from 'react';
import {connect} from 'react-redux'; // Component - класс из пакета react
import './index.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import PointForm from "./components/PointForm";
import Graphic from "./components/Graphic";
import Table from "./components/Table";

class Main extends Component {


    render() {
        return (
            <div>
                <Header/>
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

export default (Main);


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