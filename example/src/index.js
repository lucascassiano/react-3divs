import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Div3d, Viewer3d, Obj3d, Layer3d } from "./react-3divs";
//import Simple from "./react-3divs/React3";
import model from "./male.obj";
import mtl from "./male.mtl";
import * as THREE from "three";

import { Arc } from "./layers/Arc";
import { FrontCamera } from "./layers/FrontCamera";

let obj;
let setupLights = (scene, camera) => {
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 100, 80);
    scene.add(light);
    console.log("hello lights");
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
        setInterval(this.add, 1000);
    }

    add = () => {
        var counter = this.state.counter + 1;
        this.setState({ counter });
        //console.log(counter);
    }

    render() {
        return (
            <div>
                <div className="grid">
                    <Viewer3d stats width={600} height={600} defaultLight grid>
                        <Obj3d src={model} mtl={mtl} />

                        <Div3d name="div_health" position={{ x: 100, y: 100, z: 0 }} >
                            <h3>Sabrina{this.state.counter}</h3>
                        </Div3d>
                        {/* more similar Div3d here...*/}
                        <Layer3d setup={setupLights} />
                        {Arc}
                    </Viewer3d>
                    <div>
                        <Viewer3d stats width={300} height={300} grid>
                            <Obj3d src={model} />
                            <Layer3d setup={setupLights} />
                            {Arc}
                        </Viewer3d>
                        <Viewer3d width={300} height={300} static>
                            <Obj3d src={model} />
                            {FrontCamera}
                        </Viewer3d>
                    </div>
                </div>
            </div >

        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

