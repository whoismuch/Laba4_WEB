import React, {Component} from 'react';
import {Dropdown} from "react-toolbox/lib/dropdown";
import {Input} from "react-toolbox/lib/input";
import FormErrors from "./FormErrors";
import {connect} from 'react-redux'; // Component - класс из пакета react
import {sendPoint, setR, setX, setY} from "../actions/appActions";

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
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4', label: '4'}
];


class PointForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formErrors: {paramX: '', paramR: '', paramY: '', all: ''},
            paramXValid: false,
            paramRValid: false,
            paramYValid: false,
        };
        this.handleChangeX = this.handleChangeX.bind(this);
        this.handleChangeY = this.handleChangeY.bind(this);
        this.handleChangeR = this.handleChangeR.bind(this);
        this.paramsIsReady = this.paramsIsReady.bind(this);

    }

    handleChangeX = (value) => {
        this.props.setX(value);
        this.validateField('paramX', value)
    };

    handleChangeR = (value) => {
        this.props.setR(value);
        this.validateField('paramR', value)
    };

    handleChangeY = (value) => {
        this.props.setY(value);
        this.validateField('paramY', value)
    };

    paramsIsReady = () => {
        let errors = this.state.formErrors;
        if (!this.state.formValid) errors.all = 'Провести меня вздумали? Поля заполните и не буяньте тут';
        else {
            this.preparePoint(this.props.app.x, this.props.app.y, this.props.app.r);
        }
    };

    preparePoint(x, y, r) {
        console.log(x + " " + y + " " + r);
        let params = {
            x: x,
            y: y,
            r: r
        };
        this.props.sendPoint(params);
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


    render() {
        const {app} = this.props;
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
                            value={app.r}
                        />
                    </div>

                    <div className="selectX">
                        <label id="selectXTitle" className="selectXTitle">Выберите X</label>
                        <Dropdown
                            auto
                            onChange={this.handleChangeX}
                            class="dropdown"
                            source={paramXValues}
                            value={app.x}
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
                    <button className="checkButtonInside" onClick={this.paramsIsReady}
                            disabled={!this.state.formValid}>Проверить
                    </button>
                </div>
            </div>

        )
    }

}

const mapStateToProps = store => {
    return {
        app: store.app,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setX: x => dispatch(setX(x)),
        setR: r => dispatch(setR(r)),
        setY: y => dispatch(setY(y)),
        sendPoint: point => dispatch(sendPoint(point))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PointForm);

