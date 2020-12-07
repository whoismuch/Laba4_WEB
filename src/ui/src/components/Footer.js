import React, {Component} from 'react'; // Component - класс из пакета react
import doggy from '../resources/doggy.png';


class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="link">
                    <a id="github" href="https://github.com/whoismuch">
                        <img width="45" height="45" src={doggy} alt="doggy"/>
                        <label>GitHub</label>
                    </a>
                </div>
            </div>

        )
    }

}

export default Footer;

