import React, {Component} from 'react';
import FormErrors from "./FormErrors"; // Component - класс из пакета react


class AuthenticationForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            formErrors: {login: '', password: ''},
            loginValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleUserLoginInput = (e) => {
        const value = e.target.value;
        this.setState({login: value},  () => { this.validateField('login', value) });
    };

    handleUserPasswordInput = (e) => {
        const value = e.target.value;
        this.setState({password : value},  () => { this.validateField('password', value) });
    };


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
                passwordValid = (value.indexOf(' ') < 0)
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
        return (
            <form className="form">
                <div className={'inputArea ${this.errorClass(this.state.formErrors.login)}'} >
                    <input className={this.errorClass(this.state.formErrors.login)} type="text" placeholder="Введите логин"  onChange={this.handleUserLoginInput}/>
                </div>
                <div className={'inputArea ${this.errorClass(this.state.formErrors.password)}'}>
                    <input type="password" placeholder="Введите пароль" value={this.state.password} onChange={this.handleUserPasswordInput}/>
                </div>
                <div className="errorText">
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <div className="buttons">
                    <div className="buttonArea">
                        <button className="checkButtonInside"  disabled={!this.state.formValid}>Регистрация</button>
                    </div>
                    <div className="buttonArea">
                        <button className="checkButtonInside"  disabled={!this.state.formValid}>Войти</button>
                    </div>
                </div>

            </form>
        )
    }



}

export default AuthenticationForm;

