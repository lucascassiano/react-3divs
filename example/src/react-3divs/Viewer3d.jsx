import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as THREE from 'three';

//require('../3d/CSS3DRenderer');
import { CSS3DRenderer, CSS3DObject } from "./lib/CSS3DRenderer";
import "./viewer3d.css";

//obj loader
import OBJLoader from "three-react-obj-loader";
import MTLLoader from 'three-react-mtl-loader';
import Stats from "stats-js";

import { div3d_resolver } from "./Div3d";
import { obj3d_resolver } from "./Obj3d";

//test import CSS3DReact.js

//import escpod_wireframe from "../3d/escpod_wireframe.obj";
//import escpod_wireframe_mtl from "../3d/escpod_panels.mtl";
//var OBJLoader = require('three-obj-loader');
//OBJLoader(THREE);
//import BoxHelper from "../3d/BoxHelper.js";
//import Timeline from "./Timeline.jsx";

let renderer, scene, animation, camera, controls;

let cssScene, cssRenderer;

var OrbitControls = require('three-orbit-controls')(THREE);

//var TWEEN = require('@tweenjs/tween.js');
var backSide = "visible";

class Viewer3d extends Component {
	constructor(props) {
		super(props);

		this.state = {
			controls: null
		};

		window.addEventListener('resize', this.updateDimensions.bind(this));

		backSide = this.props.backSide;
	}

	componentDidMount() {
		this.init();

		if (this.props.stats)
			this.addStats();
	}

	addStats = () => {
		var stats = new Stats();
		stats.setMode(0);

		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		stats.domElement.style.zIndex = 120;

		this.refs.canvas3d.appendChild(stats.domElement);
		setInterval(function () {

			stats.begin();

			// your code goes here

			stats.end();

		}, 1000 / 60);
	}

	componentDidUpdate() {
		console.log('updated');
		this.createDivs();
	}

	createPlane = (w, h, position, rotation) => {
		var material = new THREE.MeshBasicMaterial({
			color: 0x000000,
			opacity: 0.0
		});

		var geometry = new THREE.PlaneGeometry(w, h);

		var mesh = new THREE.Mesh(geometry, material);

		mesh.position.x = position.x;
		mesh.position.y = position.y;
		mesh.position.z = position.z;

		mesh.rotation.x = rotation.x;
		mesh.rotation.y = rotation.y;
		mesh.rotation.z = rotation.z;

		this.scene.add(mesh);

		var material2 = new THREE.MeshBasicMaterial({
			color: 0x000000,
			opacity: 0
		});

		console.log("hidden", backSide);

		if (backSide == "hidden") {
			material2 = new THREE.MeshBasicMaterial({
				color: 0x000000,
				opacity: 1
			});
		}

		var mesh2 = new THREE.Mesh(geometry, material2);

		mesh2.position.x = position.x;
		mesh2.position.y = position.y;
		mesh2.position.z = position.z;

		mesh2.rotation.x = rotation.x;
		mesh2.rotation.y = rotation.y + Math.PI;
		mesh2.rotation.z = rotation.z;

		scene.add(mesh2);

		return mesh;
	}

	createDivs = async () => {
		var origin = this.props.position;
		const { children } = this.props;

		while (this.cssScene.children.length > 0) {
			this.cssScene.remove(this.cssScene.children[0]);
		}

		React.Children.forEach(this.props.children, async (child) => {
			console.log(child);
			switch (child.type.name) {
				case "Div3d":
					var cssObject = div3d_resolver(child, origin);
					this.cssScene.add(cssObject);
					break;
				case "Obj3d":
					//onsole.log("obj3");
					var object = await obj3d_resolver(child, origin);
					console.log("obj3", object);
					//object.tra
					this.scene.add(object);
					break;
			}
		});
	}

	init = () => {
		const width = this.props.width ? this.props.width : window.innerWidth;
		const height = this.props.height ? this.props.height : window.innerHeight;

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 10000);

		this.camera.position.set(300, 300, 300);

		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.setPixelRatio(window.devicePixelRatio);

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		this.renderer.domElement.className = "renderer";

		this.renderer.setSize(width, height);

		//CSS3D Scene
		this.cssScene = new THREE.Scene();

		//CSS3D Renderer
		this.cssRenderer = new CSS3DRenderer();

		this.cssRenderer.setSize(width,height);
		this.cssRenderer.domElement.className = "cssRenderer";

		var controls = new OrbitControls(this.camera, this.cssRenderer.domElement);

		controls.enableZoom = true;

		this.refs.canvas3d.appendChild(this.cssRenderer.domElement);
		this.refs.canvas3d.appendChild(this.renderer.domElement);

		var scene = this.scene;

		var size = 10000;
		var divisions = 100;
		
		var gridHelper = new THREE.GridHelper(size, divisions, 0x666666, 0x333333);
		scene.add(gridHelper);
		scene.fog = new THREE.FogExp2(0x000, 0.0003);

		var geometry = new THREE.BoxGeometry(10, 100, 100);
		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		var cube = new THREE.Mesh(geometry, material);

		//scene.add(cube);
		this.createDivs();


		var objLoader = new OBJLoader();

		//support lines

		var axesHelper = new THREE.AxesHelper(100);
		axesHelper.position.y = 1;
		scene.add(axesHelper);

		var disk = this.disk(70, 10, 360,0.1);
		disk.rotation.x = Math.PI * 0.5;
		disk.position.y = 1;
		scene.add(disk);

		var disk = this.disk(67.5, 5, 90, 1);
		disk.rotation.x = Math.PI * 0.5;
		scene.add(disk);


		var disk = this.disk(70, 10, 360,0.1);
		disk.rotation.x = Math.PI * 0.5;
		disk.position.y = 41;
		scene.add(disk);

		var disk = this.disk(67.5, 5, 120, 1);
		disk.rotation.x = Math.PI * 0.5;
		disk.position.y = 40;
		scene.add(disk);



		var disk = this.disk(70, 10, 360,0.1);
		disk.rotation.x = Math.PI * 0.5;
		disk.position.y = 81;
		scene.add(disk);

		var disk = this.disk(67.5, 5, 10, 1);
		disk.rotation.x = Math.PI * 0.5;
		disk.position.y = 80;
		scene.add(disk);

		var light = new THREE.AmbientLight(0x333333); // soft white light
		scene.add(light);

		var light = new THREE.PointLight(0xffffff, 1, 100);
		light.position.set(0, 100, 80);
		scene.add(light);

		this.animate();
	}

	toDegrees = (angle) => {
		return angle * (180 / Math.PI);
	}

	toRadians = (angle) => {
		return angle * (Math.PI / 180);
	}

	disk = (radius, border = 10, angle = 360, opacity = 1) => {
		var rad = this.toRadians(angle);
		var geometry = new THREE.RingGeometry(radius, radius - border, 32, 1, 0, rad);
		var material = new THREE.MeshBasicMaterial({ color: "#fff", side: THREE.DoubleSide, opacity: opacity, transparent: true });
		var mesh = new THREE.Mesh(geometry, material);
		return mesh;
	}

	animate = () => {
		this.animation = requestAnimationFrame(this.animate);
		this.renderer.render(this.scene, this.camera);
		this.cssRenderer.render(this.cssScene, this.camera);
	}

	update = () => {
		controls.update();
		//delta += clock.getDelta();
	}

	updateDimensions = () => {
		//Get the proportions from screen
		const width = this.props.width ? this.props.width : window.innerWidth;
		const height = this.props.height ? this.props.height : window.innerHeight;

		renderer.setSize(width, height);
		cssRenderer.setSize(width, height);

		renderer.setPixelRatio(window.devicePixelRatio);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}

	render() {
		return <div className="env3d">
			<div ref="canvas3d" className="grid3d" />
		</div>;
	}
}

export default Viewer3d;
