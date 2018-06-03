import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from "./CSS3DRenderer";

import { } from "./viewer3d.css";

let renderer, scene, animation, camera, controls;

let cssScene, cssRenderer;

var OrbitControls = require('three-orbit-controls')(THREE);

export const div3d_resolver = function (panel, origin = new THREE.Vector3(0, 0, 0)) {
    var div = document.createElement('div');

    var width = panel.props.width;
    var height = panel.props.height;

    var style = { height: height, width: width };

    var panelWithProps = React.cloneElement(panel);

    ReactDOM.render(panelWithProps, div);

    div.style = style;

    div.style.width = width; //panel.props.width;
    div.style.height = height;//panel.props.height + 'px';

    var cssObject = new CSS3DObject(div);
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

    return cssObject;
}

class Div3d extends Component {

    constructor(props) {
        super(props);
    }

    setLayer(layer) {
        this.setState({ layer: layer });
    }

    render() {
        var style = { height: this.props.height, width: this.props.width };
        return (
            <div style={style} width={this.props.width} height={this.props.height} className="panel-3d" >
                {this.props.children}
            </div>
        );
    }
}

export default Div3d;