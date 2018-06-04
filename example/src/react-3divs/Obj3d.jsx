import React, { Component } from 'react';
import * as THREE from 'three';

import OBJLoader from "three-react-obj-loader";
import MTLLoader from 'three-react-mtl-loader';


export const obj3d_resolver = (element, origin = new THREE.Vector3(0, 0, 0), material) => {

    return new Promise(function (resolve, reject) {

        const objLoader = new OBJLoader();

        var source_obj = element.props.src;
        var source_mtl = element.props.mtl;

        if (source_mtl) {
            var mtlLoader = new MTLLoader();
            mtlLoader.load(source_mtl, function (materials) {
                materials.preload();

                var objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                
                objLoader.load(source_obj, function (object) {
                    resolve(object);
                });
            });
        }

        else
            objLoader.load(source_obj, async function (object) {

                if (!material) {
                    material = new THREE.MeshBasicMaterial({
                        color: 0xf0f0f0,
                        transparent: true,
                        opacity: 1,
                        wireframe: true
                    });
                }

                object.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = material;
                    }
                    child.traverse(function (c) {
                        c.material = material;
                    });
                });

                resolve(object);
            });
    });
}

class Obj3d extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div></div>);
    }
}

export default Obj3d;