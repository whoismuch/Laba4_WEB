import React, {Component} from 'react';
import {Dropdown} from "react-toolbox/lib/dropdown";
import {Input} from "react-toolbox/lib/input";
import FormErrors from "./FormErrors";

const paramXValues = [
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

const paramRValues = [
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
            paramR: '',
            paramY: '',
            formErrors: {paramX: '', paramR: '', paramY: ''},
            paramXValid: false,
            paramRValid: false,
            paramYValid: false

        };
        this.handleChangeX = this.handleChangeX.bind(this);
        this.handleChangeR = this.handleChangeR.bind(this)

    }

    handleChangeX = (value) => {
        this.setState({paramX: value}, () => {
            this.validateField('paramX', value)
        });
    };

    handleChangeR = (value) => {
        this.setState({paramR: value}, () => {
            this.validateField('paramR', value)
        });
    };

    handleChangeY = (value) => {
        this.setState({paramY: value}, () => {
            this.validateField('paramY', value)
        });
    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let paramXValid = this.state.paramXValid;
        let paramYValid = this.state.paramYValid;
        let paramRValid = this.state.paramRValid;

        switch (fieldName) {
            case 'paramX':
                paramXValid = (value != '');
                fieldValidationErrors.paramX = paramXValid ? '' : 'Вы же X не выбрали, повнимательнее';
                break;
            case 'paramR':
                paramRValid = (value != '');
                fieldValidationErrors.paramR = paramRValid ? '' : 'Вы же R не выбрали, повнимательнее';
                break;
            case 'paramY':
                paramYValid = (value != '');
                fieldValidationErrors.paramY = paramYValid ? '' : 'А Y я вводить буду?';
                if (!paramYValid) break;
                paramYValid = (!(isNaN(value) && value || !isNaN(value) && (Number(value) < -3 || Number(value) > 5)));
                fieldValidationErrors.paramY = paramYValid ? '' : 'Числоооо нужноооо от -3 до 5'
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            paramXValid: paramXValid,
            paramYValid: paramYValid,
            paramRValid: paramRValid,
        }, this.validateForm);

    }

    validateForm() {
        this.setState({
            formValid: this.state.paramXValid &&
                this.state.paramYValid && this.state.paramRValid
        });

    }

    errorClass(error) {
        return(error.length == 0 ? '' : 'input-error' )
    }

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
                            source={paramRValues}
                            value={this.state.paramR}
                        />
                    </div>

                    <div className="selectX">
                        <label id="selectXTitle" className="selectXTitle">Выберите X</label>
                        <Dropdown
                            auto
                            onChange={this.handleChangeX}
                            class="dropdown"
                            source={paramXValues}
                            value={this.state.paramX}
                        />
                    </div>

                </div>
                <div className="enterY">
                    <Input onChange={this.handleChangeY} placeholder="Введите значение Y от -3 до 5" id="inp"/>
                </div>
                <div className="errorText">
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <div className="checkButton">
                    <button className="checkButtonInside" disabled={!this.state.formValid}>Проверить</button>
                </div>
            </div>

        )
    }
}

export default PointForm;

