import React, { Component } from 'react';

import * as THREE from 'three';

export const layer3d_resolver = function (object, origin = new THREE.Vector3(0, 0, 0)) {
   var exp_layer = {setup:object.props.setup, update:object.props.update};
   if(object.props.layer){
       var layer = new object.props.layer();
       exp_layer = {setup:layer.setup, update:layer.update};
   }
   return exp_layer;
}

class Layer3d extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div />
        );
    }
}

export default Layer3d;
