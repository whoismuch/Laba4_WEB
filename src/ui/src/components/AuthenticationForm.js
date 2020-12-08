import React, {Component} from 'react'; // Component - класс из пакета react


class AuthenticationForm extends Component {
    render() {
        return (
            <form className="form">
                <div className="inputArea">
                    <input type="text" placeholder="Введите логин"/>
                </div>
                <div className="inputArea">
                    <input type="password" placeholder="Введите пароль"/>
                </div>
                <div className="buttons">
                    <div className="buttonArea">
                        <button className="checkButtonInside">Регистрация</button>
                    </div>
                    <div className="buttonArea">
                        <button className="checkButtonInside">Войти</button>
                    </div>
                </div>
            </form>
        )
    }

}

export default AuthenticationForm;

