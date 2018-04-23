import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as THREE from 'three';

//require('../3d/CSS3DRenderer');
import {CSS3DRenderer,CSS3DObject} from "../lib/CSS3DRenderer";
//import {} from "../styles/Grid3d.css";

import {} from "../css/viewer3d.css";

let renderer, scene, animation, camera, controls;

let cssScene, cssRenderer;

var OrbitControls = require('three-orbit-controls')(THREE);

class Div3d extends Component {

	constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.OnEnter = this.OnEnter.bind(this);
        this.hover = this.hover.bind(this);
        this.cssLayer = null;
    }

    OnEnter () {
        //alert("in");
    }

    start(){

    }

    update(){

    }

    hover(){
        
    }

    setLayer(layer){
        this.setState({layer:layer});
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

export default  Div3d;