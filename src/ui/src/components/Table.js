import React, {Component} from 'react'; // Component - класс из пакета react
import {connect} from 'react-redux'; // Component - класс из пакета react


class Table extends Component {
    render() {
        return (
            <div className="table">
                <table value="">
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Результат</th>
                    </tr>
                    {this.props.app.table.map((point, index) => {
                        console.log(point.result);
                        return (
                            <tr key={index}>
                                <td>{point.x}</td>
                                <td>{point.y}</td>
                                <td>{point.r}</td>
                                <td>{point.result.toString()}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        )
    }

}

const mapStateToProps = store => {
    return {
        app: store.app,
    }
};


export default connect(mapStateToProps)(Table);

