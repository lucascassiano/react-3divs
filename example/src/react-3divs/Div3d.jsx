import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject, React_CSS3DObject } from "./lib/CSS3DRenderer";

import { } from "./viewer3d.css";

let renderer, scene, animation, camera, controls;

let cssScene, cssRenderer;

var OrbitControls = require('three-orbit-controls')(THREE);

let counter_id = 0;

export const div3d_resolver = function (panel, origin = new THREE.Vector3(0, 0, 0)) {
    var width = panel.props.width;
    var height = panel.props.height;

    var style = { height: height, width: width };

    var panelWithProps = React.cloneElement(panel);

    var cssObject = new React_CSS3DObject(panel, panel.props);
    var position = new THREE.Vector3(0, 0, 0);

    if (panel.props.position) {
        position = panel.props.position;
    }

    cssObject.position.x = position.x + origin.x;
    cssObject.position.y = position.y + origin.y;
    cssObject.position.z = position.z + origin.z;

    var rotation = new THREE.Vector3(0, 0, 0);

    if (panel.props.rotation) {
        rotation = panel.props.rotation;
    }

    cssObject.rotation.x = rotation.x * Math.PI / 180; //in degrees
    cssObject.rotation.y = rotation.y * Math.PI / 180;
    cssObject.rotation.z = rotation.z * Math.PI / 180;

    counter_id++;
    cssObject.counter_id = counter_id;
    cssObject.name = panel.props.name;

    return cssObject;
}

class Div3d extends Component {

    constructor(props) {
        super(props);
        this.setStyle = this.setStyle.bind(this);
    }

    setLayer(layer) {
        this.setState({ layer: layer });
    }

    setStyle(style){
        console.log("new style", style);
    }
    
    render() {
        let style = this.props.style;

        if (this.props.height && this.props.width && !style)
            style = { height: this.props.height, width: this.props.width };

        return (
            <div style={style} width={this.props.width} height={this.props.height} className="div-3d" >
                {this.props.children}
            </div>
        );
    }
}

export default Div3d;
