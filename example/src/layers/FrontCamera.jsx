import React, { Component } from 'react';
import * as THREE from "three";
import { Layer3d } from "../react-3divs";

class Layer {
    constructor() {

    }

    setup = (scene, camera, renderer, utils) => {
        camera.position.set(0, 70, -200);
        camera.lookAt(new THREE.Vector3(0, 70, 0));
    }

    update = (scene, camera, renderer, utils) => {

    }

}

export const FrontCamera = (<Layer3d layer={Layer} />);