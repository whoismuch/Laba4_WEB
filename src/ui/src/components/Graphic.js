import React, {Component} from 'react'; // Component - класс из пакета react
import '../index.css';


class Graphic extends Component {
    render() {
        return (
            <div className="svg">
                <svg id="svg"  width="300" height="300" class="svg-graph">


                    <line className="axis" x1="0" x2="300" y1="150" y2="150" stroke="black"></line>
                    <line className="axis" x1="150" x2="150" y1="0" y2="300" stroke="black"></line>
                    <polygon points="150,0 144,15 156,15" stroke="black"></polygon>
                    <polygon points="300,150 285,156 285,144" stroke="black"></polygon>

                    <line className="coor-line" x1="200" x2="200" y1="155" y2="145" stroke="black"></line>
                    <line className="coor-line" x1="250" x2="250" y1="155" y2="145" stroke="black"></line>

                    <line className="coor-line" x1="50" x2="50" y1="155" y2="145" stroke="black"></line>
                    <line className="coor-line" x1="100" x2="100" y1="155" y2="145" stroke="black"></line>

                    <line className="coor-line" x1="145" x2="155" y1="100" y2="100" stroke="black"></line>
                    <line className="coor-line" x1="145" x2="155" y1="50" y2="50" stroke="black"></line>

                    <line className="coor-line" x1="145" x2="155" y1="200" y2="200" stroke="black"></line>
                    <line className="coor-line" x1="145" x2="155" y1="250" y2="250" stroke="black"></line>

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
                             fill="blue" fillOpacity="0.7" stroke="blue"></polygon>

                    <polygon class="triangle-figure" points="50,150 150,150 150,200"
                             fill="blue" fillOpacity="0.7" stroke="blue"></polygon>

                    <path class="circle-figure" d="M 100 150 A 50 50, 180, 0, 1, 150 100 L 150 150 Z"
                          fill="blue" fillOpacity="0.7" stroke="blue"></path>

                    <polygon id="frame" class="frame" points="0,0 0,300 300,300 300,0"></polygon>

                </svg>
            </div>
        )
    }

}

export default Graphic;

