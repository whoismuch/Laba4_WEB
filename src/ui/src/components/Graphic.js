import React, {Component} from 'react'; // Component - класс из пакета react
import '../index.css';
import {connect} from 'react-redux'; // Component - класс из пакета react
import {sendPoint, setR, setX, setY} from "../actions/appActions";

let circles = [];

class Graphic extends Component {

    constructor(props) {
        super(props);
        this.handleClickFrame = this.handleClickFrame.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.clearGraphic();
        this.drawPoints(this.props.app.table);
    }

    clearGraphic() {

        let svg = document.getElementById("svg");

        for (let i = 0; i < circles.length; i++) {
            if (svg.contains(circles[i])) svg.removeChild(circles[i]);
        }

        circles = [];
    }


    drawPoints(table) {
        for (const point of table) {
            this.drawPoint(point.x, point.y, point.r, point.result)
        }
    }

    drawPoint(x, y, r, result) {
        const xmlns = "http://www.w3.org/2000/svg";

        let circle = document.createElementNS(xmlns, "circle");

        if (this.props.app.r != null) {
            circle.setAttribute('cx', 150 + ((x * 100) / Number(this.props.app.r)));
            circle.setAttribute('cy', 150 - ((y * 100) / Number(this.props.app.r)));
        } else {
            circle.setAttribute('cx', 150 + ((x * 100) / (r)));
            circle.setAttribute('cy', 150 - ((y * 100) / (r)));
        }

        circle.setAttribute('r', 3);


        if (result) circle.style.fill = 'green';
        else circle.style.fill = 'red';

        let svg = document.getElementById("svg");

        circles.push(circle);
        svg.appendChild(circle)
    }

    render() {
        return (
            <div className="svg">
                <svg id="svg" width="300" height="300" class="svg-graph">


                    <line className="axis" x1="0" x2="300" y1="150" y2="150" stroke="black"/>
                    <line className="axis" x1="150" x2="150" y1="0" y2="300" stroke="black"/>
                    <polygon points="150,0 144,15 156,15" stroke="black"/>
                    <polygon points="300,150 285,156 285,144" stroke="black"/>

                    <line className="coor-line" x1="200" x2="200" y1="155" y2="145" stroke="black"/>
                    <line className="coor-line" x1="250" x2="250" y1="155" y2="145" stroke="black"/>

                    <line className="coor-line" x1="50" x2="50" y1="155" y2="145" stroke="black"/>
                    <line className="coor-line" x1="100" x2="100" y1="155" y2="145" stroke="black"/>

                    <line className="coor-line" x1="145" x2="155" y1="100" y2="100" stroke="black"/>
                    <line className="coor-line" x1="145" x2="155" y1="50" y2="50" stroke="black"/>

                    <line className="coor-line" x1="145" x2="155" y1="200" y2="200" stroke="black"/>
                    <line className="coor-line" x1="145" x2="155" y1="250" y2="250" stroke="black"/>

                    <text className="coor-text" x="195" y="140">R/2</text>
                    <text className="coor-text" x="248" y="140">R</text>

                    <text className="coor-text" x="40" y="140">-R</text>
                    <text className="coor-text" x="90" y="140">-R/2</text>

                    <text className="coor-text" x="160" y="105">R/2</text>
                    <text className="coor-text" x="160" y="55">R</text>

                    <text className="coor-text" x="160" y="205">-R/2</text>
                    <text className="coor-text" x="160" y="255">-R</text>

                    <text className="axis-text" x="290" y="170">X</text>
                    <text className="axis-text" x="160" y="13">Y</text>

                    <polygon class="rectangle-figure" points="150,150 250,150 250,250, 150,250"
                             fill="blue" fillOpacity="0.7" stroke="blue"/>

                    <polygon class="triangle-figure" points="50,150 150,150 150,200"
                             fill="blue" fillOpacity="0.7" stroke="blue"/>

                    <path class="circle-figure" d="M 100 150 A 50 50, 180, 0, 1, 150 100 L 150 150 Z"
                          fill="blue" fillOpacity="0.7" stroke="blue"/>

                    <polygon ref='frame' onClick={this.handleClickFrame} id="frame" class="frame"
                             points="0,0 0,300 300,300 300,0"/>

                </svg>

                <div className="svgErrorText">
                    <label ref='labelChR' className="svgErrors"/>
                </div>

            </div>
        )
    }

    handleClickFrame = (event) => {

        const frame = this.refs.frame;
        const label = this.refs.labelChR;


        if (this.props.app.r == null) {
            label.innerHTML = "Ну не по-пацански это, R выберите";
        } else {
            label.innerHTML = "";

            let x0 = frame.getBoundingClientRect().x;
            let y0 = frame.getBoundingClientRect().y;

            let centerX = x0 + 150;
            let centerY = y0 + 150;

            let currentX = (event.pageX - centerX) / 100 * this.props.app.r;
            let currentY = (centerY - event.pageY) / 100 * this.props.app.r;


            this.props.setX(currentX.toFixed(2));
            this.props.setY(currentY.toFixed(2));

            let params = {
                x: currentX.toFixed(2),
                y: currentY.toFixed(2),
                r: this.props.app.r
            };

            console.log(params);
            this.props.sendPoint(params);
        }
    };


}


const mapStateToProps = store => {
    return {
        app: store.app,
    }
};

const mapDispatchToProps = dispatch => {
        return {
            setX: x => dispatch(setX(x)),
            setR: r => dispatch(setR(r)),
            setY: y => dispatch(setY(y)),
            sendPoint: point => dispatch(sendPoint(point))
        }
    }
;

export default connect(mapStateToProps, mapDispatchToProps)(Graphic);

