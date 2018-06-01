import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Div3d, Viewer3d, Obj3d } from "./react-3divs";
//import Simple from "./react-3divs/React3";
import model from "./male.obj";
import mtl from "./male.mtl";
/*


*/
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
        //setInterval(this.add, 1000);
    }

    add = () => {
        var counter = this.state.counter + 1;
        this.setState({ counter });
        console.log(counter);
    }

    render() {
        var divs = [];
        var counter = 0;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 4; j++) {
                counter++;
                divs.push(
                    <Div3d position={{ x: 100 * i, y: 100 * j, z: 0 }}>
                        <h3>Panel {counter}</h3><p>{this.state.counter}</p>
                    </Div3d>
                );
            }
        }
        return (
            <div>
                <div className="grid">
                    <Viewer3d stats width={600} height={600}>
                        <Obj3d src={model} mtl={mtl} />
                        <Div3d position={{ x: 100, y: 100, z: 0 }}>
                            <h3>Heart {counter}</h3>
                        </Div3d>
                        <Div3d position={{ x: -100, y: 10, z: 0 }}>
                            <h3>View{counter}</h3>
                        </Div3d>
                    </Viewer3d>

                    <Viewer3d stats width={300} height={300}>
                    <Obj3d src={model} />
                </Viewer3d>
                </div>

                
            </div>

        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

