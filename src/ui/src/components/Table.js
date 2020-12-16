import React, {Component} from 'react'; // Component - класс из пакета react


class Table extends Component {
    render() {
        return (
            <div className="table">
                    <table  value="">
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Результат</th>
                        </tr>
                        <tr>
                            <label value="x"/>
                        </tr>

                        <tr>
                            <label value="y"/>
                        </tr>

                        <tr>
                            <label value="r"/>
                        </tr>

                        <tr>
                            <label value="result"/>
                        </tr>
                    </table>
            </div>
        )
    }

}

export default Table;

