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
import { layer3d_resolver } from "./Layer3d";
import { SIGPROF } from 'constants';

let renderer, scene, animation, camera, controls;

let cssScene, cssRenderer;

var OrbitControls = require('three-orbit-controls')(THREE);

//var TWEEN = require('@tweenjs/tween.js');
var backSide = "visible";

class Viewer3d extends Component {
	constructor(props) {
		super(props);

		this.state = {
			controls: null,
			cssDivs: []
		};

		this.addStats = this.addStats.bind(this);
		window.addEventListener('resize', this.updateDimensions.bind(this));

		backSide = this.props.backSide;
		this.layers = [];
		this.cssDivs = [];
		var _this = this;

		this.utils = {
			setCamera: (camera) => {
				//this.camera = new THREE.PerspectiveCamera(camera);
				//this.camera = new THREE.PerspectiveCamera(50, 100 / 100, 0.01, 10000);
			},
			setCameraPosition: (position) => {
				//this.camera = new THREE.PerspectiveCamera(50, 1, 0.01, 10000);
				this.camera.position.set(position);
			}
		};

	}

	componentDidMount() {

		this.init();

		if (this.props.stats)
			this.addStats();
	}

	addStats() {
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

	createDivs = async () => {
		var origin = this.props.position;
		const { children } = this.props;
		var cssDivs = [];
		await React.Children.forEach(this.props.children, async (child) => {
			console.log(child);
			switch (child.type.name) {
				case "Div3d":
					var cssObject = div3d_resolver(child, origin);
					this.cssScene.add(cssObject);
					break;
				case "Obj3d":
					var object = await obj3d_resolver(child, origin);
					this.scene.add(object);
					break;
				case "Layer3d":
					var layer = await layer3d_resolver(child, origin);
					this.layers.push(layer);
					break;
			}
		});

		await this.layers.forEach((layer) => {
			if (layer.setup)
				layer.setup(this.scene, this.camera, this.renderer, this.utils);
		});

		this.setState({ cssDivs });
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

		this.cssRenderer.setSize(width, height);
		this.cssRenderer.domElement.className = "cssRenderer";

		if (!this.props.static) {
			this.controls = new OrbitControls(this.camera, this.cssRenderer.domElement);
			this.controls.enableZoom = this.props.enableZoom ? this.props.enableZoom : true;
			this.controls.enablePan = this.props.enablePan ? this.props.enablePan : true;
		}

		this.refs.canvas3d.appendChild(this.cssRenderer.domElement);
		this.refs.canvas3d.appendChild(this.renderer.domElement);

		var scene = this.scene;

		if (this.props.grid) {
			var size = 10000;
			var divisions = 1000;
			var gridHelper = new THREE.GridHelper(size, divisions, 0x666666, 0x333333);

			//var gridHelper2 = new THREE.GridHelper(size, divisions*10, 0x222222, 0x111111);

			scene.add(gridHelper);
			//scene.add(gridHelper2);
			scene.fog = new THREE.FogExp2(0x000, 0.0003);
			/*
						var axesHelper = new THREE.AxesHelper(100);
						axesHelper.position.y = 1;
						scene.add(axesHelper);
			*/

			//axis
			var dir = new THREE.Vector3(1, 0, 0);

			//normalize the direction vector (convert to vector of length 1)
			dir.normalize();

			var origin = new THREE.Vector3(0, 0, 0);
			var length = 50;
			var hex = 0xff0000;

			var arrowHelperX = new THREE.ArrowHelper(dir, origin, length, hex);
			scene.add(arrowHelperX);

			var arrowHelperY = new THREE.ArrowHelper(
				new THREE.Vector3(0, 1, 0),
				origin,
				length,
				0x00FF00);
			scene.add(arrowHelperY);

			var arrowHelperZ = new THREE.ArrowHelper(
				new THREE.Vector3(0, 0, 1),
				origin,
				length,
				0x0000FF);
			scene.add(arrowHelperZ);
		}

		this.createDivs();

		if (this.props.light) {
			var light = this.props.light;
			scene.add(light);
		}
		if (this.props.defaultLight) {
			var light = new THREE.AmbientLight(0x333333); // soft white light
			scene.add(light);
		}

		/*
				var objLoader = new OBJLoader();
		
				//support lines
		
				var axesHelper = new THREE.AxesHelper(100);
				axesHelper.position.y = 1;
				scene.add(axesHelper);
		
				var disk = this.disk(70, 10, 360, 0.1);
				disk.rotation.x = Math.PI * 0.5;
				disk.position.y = 1;
				scene.add(disk);
		
				var disk = this.disk(67.5, 5, 90, 1);
				disk.rotation.x = Math.PI * 0.5;
				scene.add(disk);
		
				var disk = this.disk(70, 10, 360, 0.1);
				disk.rotation.x = Math.PI * 0.5;
				disk.position.y = 41;
				scene.add(disk);
		
				var disk = this.disk(67.5, 5, 120, 1);
				disk.rotation.x = Math.PI * 0.5;
				disk.position.y = 40;
				scene.add(disk);
		
				var disk = this.disk(70, 10, 360, 0.1);
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
		*/
		this.animate();
	}

	componentWillUpdate() {
		console.log('updated');
		this.updateDivs();
	}

	updateDivs = () => {
		var origin = this.props.position;
		let cssDivs = [];

		React.Children.forEach(this.props.children, async (child) => {
			switch (child.type.name) {
				case "Div3d":
					if (child.props.name) {
						var object = this.cssScene.getObjectByName(child.props.name);
						if (object.props != child.props) {
							object.update(child);
						}
					}
					break;
			}
		});
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


	animate = async () => {

		await this.layers.forEach((layer) => {
			if (layer.update)
				layer.update(this.scene, this.camera, this.renderer, this.utils);
		});

		this.animation = requestAnimationFrame(this.animate);
		this.renderer.render(this.scene, this.camera);
		this.cssRenderer.render(this.cssScene, this.camera);

	}

	update = () => {
		if (this.controls)
			this.controls.update();
	}

	updateDimensions = () => {
		//Get the proportions from screen
		const width = this.props.width ? this.props.width : window.innerWidth;
		const height = this.props.height ? this.props.height : window.innerHeight;

		this.renderer.setSize(width, height);
		this.cssRenderer.setSize(width, height);

		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
	}

	render() {
		return <div className="env3d">
			<div ref="canvas3d" className="grid3d" />
		</div>;
	}
}

export default Viewer3d;
