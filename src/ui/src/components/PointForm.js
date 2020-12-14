import React, {Component} from 'react';

const countries = [
    {value: 'EN-gb', label: 'England'},
    {value: 'ES-es', label: 'Spain'},
    {value: 'TH-th', label: 'Thailand'},
    {value: 'EN-en', label: 'USA'}
];

class PointForm extends Component {

    state = {value: 'ES-es'};

    handleChange = (value) => {
        this.setState({value: value});
    };

    render() {
        return (
            <div className={this.props.className}>
                <div className="fillItPls">Заполните тут все, позязя</div>
                <div className="XR">
                    <div className="chooseR">

                    </div>

                    <div className="selectX">
                    </div>


                    <div className="enterY">

                    </div>
                    <div className="checkButton">

                    </div>
                </div>
            </div>
        )
    }
}

export default PointForm;

