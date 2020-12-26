import React, {Component} from 'react'; // Component - класс из пакета react


class OldHeader extends Component {

    render() {
        console.log('items', this.props.items);
        return (
            <div>
                {this.props.items.map((item, index) =>
                    <a href={item.link} key={index}>{item.label}</a>)}
            </div>
        ) // HTML разметка, это ненормально для JS файла и такой JS файл невалидный.
        //На самом деле это не чистый JS файл. Это специальный JSX синтаксис, который позволяет писать HTML в файлах JS
    }
}



export default OldHeader;

// код c JSX не выполняется в браузере, а транспалится в валидный JS и после этого уже выполняется браузером