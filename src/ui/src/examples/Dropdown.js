import React, {Component} from 'react'; // Component - класс из пакета react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Dropdown extends Component {
    constructor(props){
        super(props)
        this.state = {
            listOpen: false,
            headerTitle: this.props.title
        }
    }

    handleClickOutside(){
        this.setState({
            listOpen: false
        })
    }
    toggleList(){
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }
    render(){
        const{list} = this.props
        const{listOpen, headerTitle} = this.state
        return(
            <div className="dd-wrapper dropdown">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{headerTitle}</div>
                    {listOpen
                        ? <FontAwesomeIcon name="angle-up" size="2x" icon="coffee"/>
                        : <FontAwesomeIcon name="angle-down" size="2x" icon="coffee"/>
                    }
                </div>
                {listOpen && <ul className="dd-list dropdown-content">
                    {list.map((item) => (
                        <li className="dd-list-item" key={item.id} >{item.title}</li>
                    ))}
                </ul>}
            </div>
        )
    }

}
export default Dropdown;





//     constructor(props) {
//         super(props);
//         this.state = {isOpened: false};
//
//     }
//
//     toggleState() {
//         this.setState({isOpened: !this.state.isOpened});
//     }
//
//     render() {
//         console.log('isOpened:', this.state.isOpened);
//         let dropdownText;
//         if (this.state.isOpened) {
//             dropdownText = <div>ШпекКекЧебурек</div>
//         }
//         return (
//             <div onClick={this.toggleState.bind(this)}>
//                 It's dropdown's baby
//                 {dropdownText}
//             </div>
//         )// если использовать this.toggleState(), то функция вызовется сразу при инициализации
//     }
//     //this.toggleState вызывается не в контексте класса и поэтому this - underfined
// }