import React, {Component} from 'react'; // Component - класс из пакета react


class Header extends Component {
    render() {
        const {name,surname,variant,group} = this.props;
        return (
            <div className="header">
                <em>
                    <p>{surname + " " + name}</p>
                    <p>Вариант №{variant}</p>
                    <p>Группа №{group}</p>
                </em>
            </div>
        )
    }

}

export default Header;

