import React, {Component} from 'react';
import {Dropdown} from "react-toolbox/lib/dropdown";
import {Input} from "react-toolbox/lib/input";

const paramX = [
    {value: '-4', label: '-4'},
    {value: '-3', label: '-3'},
    {value: '-2', label: '-2'},
    {value: '-1', label: '-1'},
    {value: '0', label: '0'},
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4', label: '4'}
];

const paramR = [
    {value: '-4', label: '-4'},
    {value: '-3', label: '-3'},
    {value: '-2', label: '-2'},
    {value: '-1', label: '-1'},
    {value: '0', label: '0'},
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4', label: '4'}
];


class PointForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paramX: '',
            paramR: ''
        };
        this.handleChangeX = this.handleChangeX.bind(this);
        this.handleChangeR = this.handleChangeR.bind(this)

    }

    handleChangeX = (value) => {
        this.setState({paramX: value});
    };

    handleChangeR = (value) => {
        this.setState({paramR: value});
    };

    render() {
        return (
            <div className="commonGroup">
                <div className="fillItPls">Заполните тут все, позязя</div>
                <div className="XR">
                    <div className="chooseR">
                        <label id="chooseRTitle" className="chooseRTitle">Выберите R</label>
                        <Dropdown
                            auto
                            onChange={this.handleChangeR}
                            class="dropdown"
                            source={paramR}
                            value={this.state.paramR}
                        />
                    </div>

                    <div className="selectX">
                        <label id="selectXTitle" className="selectXTitle">Выберите X</label>
                        <Dropdown
                            auto
                            onChange={this.handleChangeX}
                            class="dropdown"
                            source={paramX}
                            value={this.state.paramX}
                        />
                    </div>

                </div>
                <div className="enterY">
                    <Input placeholder="Введите значение Y от -3 до 5" id="inp"/>
                </div>
                <div className="checkButton">
                    <button className="checkButtonInside">Проверить</button>
                </div>
            </div>

        )
    }
}

export default PointForm;

