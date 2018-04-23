import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as THREE from 'three';

//require('../3d/CSS3DRenderer');
import {CSS3DRenderer,CSS3DObject} from "../lib/CSS3DRenderer";
import "../css/viewer3d.css";
//obj loader
import OBJLoader from "three-react-obj-loader";
import MTLLoader from 'three-react-mtl-loader';

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
		this.init = this.init.bind(this);
		this.animate = this.animate.bind(this);
		this.state = {
			controls: null
		};
		
		window.addEventListener('resize', this.updateDimensions.bind(this));
        this.init = this.init.bind(this);
		this.createPlane = this.createPlane.bind(this);
		this.createCssObject = this.createCssObject.bind(this);
		this.create3dPage = this.create3dPage.bind(this);
		this.reactToObject = this.reactToObject.bind(this);
		this.create3dPanel = this.create3dPanel.bind(this);
		backSide = this.props.backSide;

    }

	componentDidMount() {
		this.init();
	}

	createPlane(w, h, position, rotation) {
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
		
		scene.add(mesh);


		var material2 = new THREE.MeshBasicMaterial({
			color: 0x000000,
			opacity:0
		});
		console.log("hidden", backSide);

		if(backSide == "hidden"){
			material2 = new THREE.MeshBasicMaterial({
				color: 0x000000,
				opacity:1
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

	createCssObject(w, h, position, rotation, url) {
		var html = [
			'<div style="width:' + w + 'px; height:' + h + 'px;">',
			'<iframe src="' + url + '" width="' + w + '" height="' + h + '">',
			'</iframe>',
			'</div>'
		].join('\n');

		var div = document.createElement('div');
		var style = { height: h, width: w };

		var object_jsx = (
			<div className="test" width={w} height={h} style={style}>
				hello
				<svg className="chart" width="420" height="150" aria-labelledby="title desc" role="img">
					<title id="title">A bar chart showing information</title>
					<desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>
					<g className="bar">
						<rect width="40" height="19" />
						<text x="45" y="9.5" dy=".35em">
							4 apples
						</text>
					</g>
					<g className="bar">
						<rect width="80" height="19" y="20" />
						<text x="85" y="28" dy=".35em">
							8 bananas
						</text>
					</g>
					<g className="bar">
						<rect width="150" height="19" y="40" />
						<text x="150" y="48" dy=".35em">
							15 kiwis
						</text>
					</g>
					<g className="bar">
						<rect width="160" height="19" y="60" />
						<text x="161" y="68" dy=".35em">
							16 oranges
						</text>
					</g>
					<g className="bar">
						<rect width="230" height="19" y="80" />
						<text x="235" y="88" dy=".35em">
							23 lemons
						</text>
					</g>
				</svg>
			</div>
		);

		ReactDOM.render(object_jsx, div);
		div.style.width = w;
		div.style.height = h + 'px';

		var cssObject = new CSS3DObject(div);

		cssObject.position.x = position.x;
		cssObject.position.y = position.y;
		cssObject.position.z = position.z;

		cssObject.rotation.x = rotation.x;
		cssObject.rotation.y = rotation.y;
		cssObject.rotation.z = rotation.z;

		return cssObject;
	}

	create3dPage(w, h, position, rotation, url) {
		var plane = this.createPlane(w, h, position, rotation);

		scene.add(plane);

		var cssObject = this.createCssObject(w, h, position, rotation, url);

		cssScene.add(cssObject);
    }
	
	reactToObject(element, position = new THREE.Vector3(0,0,0), rotation = new THREE.Vector3(0,0,0), origin= new THREE.Vector3(0,0,0)){
		var div = document.createElement('div');
		var width = element.props.width;
		var height = element.props.height;
		var style = { height: height, width: width };

		div.style = style;

	    div.style.width = width; //panel.props.width;
		div.style.height = height;//panel.props.height + 'px';

        var cssObject = new CSS3DObject(div);
		
		cssObject.position.x = position.x+origin.x;
		cssObject.position.y = position.y+origin.y;
		cssObject.position.z = position.z+origin.z;

		cssObject.rotation.x = rotation.x;
		cssObject.rotation.y = rotation.y;
		cssObject.rotation.z = rotation.z;

		ReactDOM.render(element , div);

		return cssObject;
	}

    create3dPanel(panel, origin=new THREE.Vector3(0,0,0)){
        
		var div = document.createElement('div');
		
		var width = panel.props.width;
		var height = panel.props.height;
		
		var style = { height: height, width: width };
		
		var createPlane = this.createPlane;
		var reactToObject = this.reactToObject;
	
		var addLayer = function(layer, cssLayer){
			//var a =reactToObject(layer, panel.props.position, origin);
			//a.name="overlay";
			//cssScene.add(a);
		}

		var removeLayer = function(cssLayer){
			//var a =reactToObject(layer);
			//var selectedObject = cssScene.getObjectByName("overlay");
			// cssScene.remove(selectedObject);	
			//console.log
		}
		
        var panelWithProps = React.cloneElement(panel, { OnMouseEnter:addLayer, onMouseLeave:removeLayer });
        
        ReactDOM.render(panelWithProps , div);
		
		div.style = style;

	    div.style.width = width; //panel.props.width;
		div.style.height = height;//panel.props.height + 'px';

        var cssObject = new CSS3DObject(div);
		var position = new THREE.Vector3(0, 0, 0);
		
        if(panel.props.position){
           position = panel.props.position;   
		}

		cssObject.position.x = position.x + origin.x;
        cssObject.position.y = position.y + origin.y;
		cssObject.position.z = position.z + origin.z;

        var rotation = new THREE.Vector3(0, 0, 0);

		if(panel.props.rotation){
			rotation = panel.props.rotation;
		}

		cssObject.rotation.x = rotation.x * Math.PI / 180 ; //in degrees
		cssObject.rotation.y =  rotation.y * Math.PI / 180;
		cssObject.rotation.z =  rotation.z * Math.PI / 180;

       //var tween = new TWEEN.Tween(position).to(target, 2000);

		cssScene.add(cssObject);
		this.createPlane(width, height,cssObject.position, cssObject.rotation);
		//scene.add(plane);
		
        return cssObject;
    }

	init() {
		const width = window.innerWidth;
		const height = window.innerHeight - (this.props.marginTop ? this.props.marginTop : 0);

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 10000);
        
        camera.position.set(300, 300, 300);

		/*renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			opacity: 0
		});
*/
		renderer = new THREE.WebGLRenderer({antialias: true,alpha:true});
    	renderer.setClearColor(0x000000,0);
    	renderer.setPixelRatio(window.devicePixelRatio);

		//renderer.setClearColor(0x000000, 0);
		//renderer.setClearColor(0x01002A);

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		
		renderer.domElement.className = "renderer";

		renderer.setSize(window.innerWidth, window.innerHeight);
		
		//CSS3D Scene
		cssScene = new THREE.Scene();
		
		//CSS3D Renderer
		cssRenderer = new CSS3DRenderer();
		cssRenderer.setSize(window.innerWidth, window.innerHeight);
		cssRenderer.domElement.className = "cssRenderer";
		
        var controls = new OrbitControls(camera, cssRenderer.domElement);
        
		controls.enableZoom = true;

		this.refs.canvas3d.appendChild(cssRenderer.domElement);
		this.refs.canvas3d.appendChild(renderer.domElement);
		
		//document.body.appendChild(renderer2.domElement);

		var size = 10000;
		var divisions = 100;

		var gridHelper = new THREE.GridHelper(size, divisions, 0x666666, 0x333333);
		scene.add(gridHelper);
		scene.fog = new THREE.FogExp2( 0x000, 0.0003 );

		var geometry = new THREE.BoxGeometry(10, 100, 100);
		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		var cube = new THREE.Mesh(geometry, material);
		
		//scene.add(cube);
		var origin = this.props.position;

        //create from children
        if(this.props.children){
            this.props.children.forEach(element => {
                if(element.type.name=="Div3d"){
                    //console.log("add one",element);
                    //this.create3dPanel(element);
                }
            });
        }

        const { children } = this.props;

        React.Children.forEach(this.props.children, (child) => {  
            console.log(child);    
            if(child.type.name=="Div3d"){
               var cssObject =  this.create3dPanel(child, origin);
            }
        });
		
		  var objLoader = new OBJLoader();

		  var material2 = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent:true,
			opacity: 0.001
			});
            /*
		  objLoader.load(escpod_wireframe, function (object) {
			object.scale.set(5,5,5);
			object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = material2;
                }
                child.traverse(function(c) {
					c.material = material2;
					var box =new THREE.BoxHelper( c, 0x1D3074);
					scene.add( box );
                });
			});

			object.material = material2;

		  });*/
	
		//support lines
		  
		var material = new THREE.LineBasicMaterial({
			color: 0xffffff
		});

		var geometry = new THREE.Geometry();

		geometry.vertices.push(
			new THREE.Vector3( -750, 1200, 0 ),
			new THREE.Vector3( 500, 1200, 0 ),
			new THREE.Vector3( 100, 0, 0 )
		);

		var line = new THREE.Line( geometry, material );
		scene.add( line );

		var axesHelper = new THREE.AxesHelper( 100 );
		axesHelper.position.y = 1;
		scene.add( axesHelper );

		this.animate();
	}

	animate() {
		animation = requestAnimationFrame(this.animate);
		renderer.render(scene, camera);
		cssRenderer.render(cssScene, camera);
	}

	update() {
		controls.update();
		//delta += clock.getDelta();
	}

	updateDimensions() {
		//Get the proportions from screen
		const width = window.innerWidth;
		const height = window.innerHeight;

		renderer.setSize(width, height);
		cssRenderer.setSize(width, height);

		renderer.setPixelRatio(window.devicePixelRatio);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}

	render() {
        console.log("children",this.props.children);
		return <div className="env3d"> 
			<div ref="canvas3d" className="grid3d"/>
		</div>;
	}
}

export default Viewer3d;
