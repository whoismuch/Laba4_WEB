import React, {Component} from 'react';
import FormErrors from "./FormErrors";
import {registration, setLogin, setPassword} from "../actions/userActions"; // Component - класс из пакета react
import {connect} from 'react-redux';
import {withRouter} from "react-router"; // Component - класс из пакета react


class AuthenticationForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            formErrors: {login: '', password: '', all: ''},
            loginValid: false,
            passwordValid: false,
        };
        this.handleUserLoginInput = this.handleUserLoginInput.bind(this);
        this.handleUserPasswordInput = this.handleUserPasswordInput.bind(this);
        this.handleUserLoginInput = this.handleUserLoginInput.bind(this);
        this.userIsReady = this.userIsReady.bind(this);
    }

    handleUserLoginInput = (e) => {
        let value = e.target.value;
        this.props.setLogin(value);
        this.validateField('login', value);
    };

    handleUserPasswordInput = (e) => {
        let value = e.target.value;
        this.props.setPassword(value);
        this.validateField('password', value);
    };

    userIsReady = (e) => {
        let errors = this.state.formErrors;
        if (!this.state.formValid) errors.all = 'Вам не стыдно? Поля заполните и не буяньте тут';
        else {
            this.prepareUser(this.props.user.login, this.props.user.password, e)
        }
    };

    prepareUser(login, password, event) {
        let params = {
            login: login,
            password: password
        };
        this.props.registration(params, event);
    }

    validateField(fieldName, value) {

        let fieldValidationErrors = this.state.formErrors;
        let loginValid = this.state.loginValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'login':
                loginValid = (value.indexOf(' ') < 0);
                fieldValidationErrors.login = loginValid ? '' : 'Пробелы в логине недопустимы';
                if (!loginValid) break;
                loginValid = value.match('^[a-zA-Z0-9]+$');
                fieldValidationErrors.login = loginValid ? '' : 'Используйте латиницу';
                if (!loginValid) break;
                loginValid = value.length >= 6;
                fieldValidationErrors.login = loginValid ? '' : 'Меньше 6 символов? Вы чего???'

                break;
            case 'password':
                passwordValid = (value.indexOf(' ') < 0);
                fieldValidationErrors.password = passwordValid ? '' : 'Пробелы в пароле недопустимы';
                if (!passwordValid) break;
                passwordValid = value.match('^[a-zA-Z0-9]+$');
                fieldValidationErrors.password = passwordValid ? '' : 'Используйте латиницу';
                if (!passwordValid) break;
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Меньше 6 символов? Вы чего???'
                break;
            default:
                break;
        }

        this.setState({formErrors: fieldValidationErrors,
             loginValid: loginValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.loginValid &&
                this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length == 0 ? '' : 'input-error' )
    }


    render() {
        const {user} = this.props;
        return (
            <form className="form">
                <div className="inputArea" >
                    <input value={user.login} className={this.errorClass(this.state.formErrors.login)} type="text" placeholder="Введите логин"  onChange={this.handleUserLoginInput}/>
                </div>
                <div className="inputArea">
                    <input value={user.password} className={this.errorClass(this.state.formErrors.password)}  type="password" placeholder="Введите пароль"  onChange={this.handleUserPasswordInput}/>
                </div>
                <div className="formErrors">
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <div className="formErrors marginTop">
                    {user.userAnswer === "" ? '' : user.userAnswer}
                </div>
                <div className="buttons">
                    <div className="buttonArea">
                        <button className="checkButtonInside" onClick={this.userIsReady} disabled={!this.state.formValid}>Регистрация</button>
                    </div>
                    <div className="buttonArea">
                        <button className="checkButtonInside"  disabled={!this.state.formValid}>Войти</button>
                    </div>
                </div>

            </form>
        )
    }
}

const mapStateToProps = store =>{
    return{
        user: store.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLogin: login => dispatch(setLogin(login)),
        setPassword: password => dispatch(setPassword(password)),
        registration: (user, event) => dispatch(registration(user, event))
    }
};

export default (withRouter(connect(mapStateToProps,mapDispatchToProps) (AuthenticationForm)));

