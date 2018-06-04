import React, { Component } from 'react';
import * as THREE from "three";
import { Layer3d } from "../react-3divs";

class Layer {
    constructor() {
        this.angle = 0;
        this.disk2;
        this.disk1;


        setInterval(() => {
            this.angle += 1;
            if (this.angle >= 360)
                this.angle = 0;
        }, 1000 / 360);
    }

    toDegrees = (angle) => {
        return angle * (180 / Math.PI);
    }

    toRadians = (angle) => {
        return angle * (Math.PI / 180);
    }

    createDisk = (radius, border = 10, angle = 360, opacity = 1, geometryOnly = false) => {
        var rad = this.toRadians(angle);
        var geometry = new THREE.RingBufferGeometry(radius, radius - border, 36, 1, 0, rad);
        if (geometryOnly)
            return geometry;

        var material = new THREE.MeshBasicMaterial({ color: "#fff", side: THREE.DoubleSide, opacity: opacity, transparent: true });
        var mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }

    setup = (scene, camera) => {
        var disk = this.createDisk(50, 10, 360, 0.1);
        disk.rotation.x = Math.PI * 0.5;
        disk.position.y = 80;
        scene.add(disk);

        this.disk2 = this.createDisk(47.5, 5, 60, 1);
        this.disk2.rotation.x = Math.PI * 0.5;
        this.disk2.position.y = 81;
        scene.add(this.disk2);

        //disk1

        var disk = this.createDisk(50, 10, 360, 0.1);
        disk.rotation.x = Math.PI * 0.5;
        disk.position.y = 40;
        scene.add(this.disk);

        this.disk1 = this.createDisk(47.5, 5, 60, 1);
        this.disk1.rotation.x = Math.PI * 0.5;
        this.disk1.position.y = 41;
        scene.add(this.disk1);
    }

    update = (scene, camera) => {
        this.disk2.geometry.dispose();
        this.disk2.geometry = this.createDisk(47.5, 5, this.angle, 1, true);

        this.disk1.geometry.dispose();
        this.disk1.geometry = this.createDisk(47.5, 5, this.angle + 90, 1, true);
    }

}

export const Arc = (<Layer3d layer={Layer} />);