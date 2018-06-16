'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _CSS3DRenderer = require('./lib/CSS3DRenderer');

require('./viewer3d.css');

var _threeReactObjLoader = require('three-react-obj-loader');

var _threeReactObjLoader2 = _interopRequireDefault(_threeReactObjLoader);

var _threeReactMtlLoader = require('three-react-mtl-loader');

var _threeReactMtlLoader2 = _interopRequireDefault(_threeReactMtlLoader);

var _statsJs = require('stats-js');

var _statsJs2 = _interopRequireDefault(_statsJs);

var _Div3d = require('./Div3d');

var _Obj3d = require('./Obj3d');

var _Layer3d = require('./Layer3d');

var _constants = require('constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderer = void 0,
    scene = void 0,
    animation = void 0,
    camera = void 0,
    controls = void 0;

//obj loader


//require('../3d/CSS3DRenderer');


var cssScene = void 0,
    cssRenderer = void 0;

var OrbitControls = require('three-orbit-controls')(THREE);

//var TWEEN = require('@tweenjs/tween.js');
var backSide = "visible";

var Viewer3d = function (_Component) {
	(0, _inherits3.default)(Viewer3d, _Component);

	function Viewer3d(props) {
		var _this3 = this;

		(0, _classCallCheck3.default)(this, Viewer3d);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Viewer3d.__proto__ || Object.getPrototypeOf(Viewer3d)).call(this, props));

		_this2.createDivs = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
			var origin, children, cssDivs;
			return _regenerator2.default.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							origin = _this2.props.position;
							children = _this2.props.children;
							cssDivs = [];
							_context2.next = 5;
							return _react2.default.Children.forEach(_this2.props.children, function () {
								var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(child) {
									var cssObject, object, layer;
									return _regenerator2.default.wrap(function _callee$(_context) {
										while (1) {
											switch (_context.prev = _context.next) {
												case 0:
													console.log(child);
													_context.t0 = child.type.name;
													_context.next = _context.t0 === "Div3d" ? 4 : _context.t0 === "Obj3d" ? 7 : _context.t0 === "Layer3d" ? 12 : 17;
													break;

												case 4:
													cssObject = (0, _Div3d.div3d_resolver)(child, origin);

													_this2.cssScene.add(cssObject);
													return _context.abrupt('break', 17);

												case 7:
													_context.next = 9;
													return (0, _Obj3d.obj3d_resolver)(child, origin);

												case 9:
													object = _context.sent;

													_this2.scene.add(object);
													return _context.abrupt('break', 17);

												case 12:
													_context.next = 14;
													return (0, _Layer3d.layer3d_resolver)(child, origin);

												case 14:
													layer = _context.sent;

													_this2.layers.push(layer);
													return _context.abrupt('break', 17);

												case 17:
												case 'end':
													return _context.stop();
											}
										}
									}, _callee, _this3);
								}));

								return function (_x) {
									return _ref2.apply(this, arguments);
								};
							}());

						case 5:
							_context2.next = 7;
							return _this2.layers.forEach(function (layer) {
								if (layer.setup) layer.setup(_this2.scene, _this2.camera, _this2.renderer, _this2.utils);
							});

						case 7:

							_this2.setState({ cssDivs: cssDivs });

						case 8:
						case 'end':
							return _context2.stop();
					}
				}
			}, _callee2, _this3);
		}));

		_this2.init = function () {
			var width = _this2.props.width ? _this2.props.width : window.innerWidth;
			var height = _this2.props.height ? _this2.props.height : window.innerHeight;

			_this2.scene = new THREE.Scene();

			_this2.camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 10000);

			_this2.camera.position.set(300, 300, 300);

			_this2.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			_this2.renderer.setClearColor(0x000000, 0);
			_this2.renderer.setPixelRatio(window.devicePixelRatio);

			_this2.renderer.shadowMap.enabled = true;
			_this2.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

			var rendererStyle = _this2.props.rendererClassName ? "renderer" : _this2.props.rendererClassName;
			_this2.renderer.domElement.className = rendererStyle;

			_this2.renderer.setSize(width, height);

			//CSS3D Scene
			_this2.cssScene = new THREE.Scene();

			//CSS3D Renderer
			_this2.cssRenderer = new _CSS3DRenderer.CSS3DRenderer();

			_this2.cssRenderer.setSize(width, height);
			var cssRendererStyle = _this2.props.cssRendererClassName ? "cssRenderer" : "cssRenderer " + _this2.props.cssRendererClassName;
			_this2.cssRenderer.domElement.className = "cssRenderer";

			if (!_this2.props.static) {
				_this2.controls = new OrbitControls(_this2.camera, _this2.cssRenderer.domElement);
				_this2.controls.enableZoom = _this2.props.enableZoom ? _this2.props.enableZoom : true;
				_this2.controls.enablePan = _this2.props.enablePan ? _this2.props.enablePan : true;
			}

			_this2.refs.canvas3d.appendChild(_this2.cssRenderer.domElement);
			_this2.refs.canvas3d.appendChild(_this2.renderer.domElement);

			var scene = _this2.scene;

			if (_this2.props.grid) {
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

				var arrowHelperY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), origin, length, 0x00FF00);
				scene.add(arrowHelperY);

				var arrowHelperZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), origin, length, 0x0000FF);
				scene.add(arrowHelperZ);
			}

			_this2.createDivs();

			if (_this2.props.light) {
				var light = _this2.props.light;
				scene.add(light);
			}
			if (_this2.props.defaultLight) {
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
			_this2.animate();
		};

		_this2.updateDivs = function () {
			var origin = _this2.props.position;
			var cssDivs = [];

			_react2.default.Children.forEach(_this2.props.children, function () {
				var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(child) {
					var object;
					return _regenerator2.default.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.t0 = child.type.name;
									_context3.next = _context3.t0 === "Div3d" ? 3 : 5;
									break;

								case 3:
									if (child.props.name) {
										object = _this2.cssScene.getObjectByName(child.props.name);

										if (object.props != child.props) {
											object.update(child);
										}
									}
									return _context3.abrupt('break', 5);

								case 5:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, _this3);
				}));

				return function (_x2) {
					return _ref3.apply(this, arguments);
				};
			}());
		};

		_this2.toDegrees = function (angle) {
			return angle * (180 / Math.PI);
		};

		_this2.toRadians = function (angle) {
			return angle * (Math.PI / 180);
		};

		_this2.disk = function (radius) {
			var border = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
			var angle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 360;
			var opacity = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

			var rad = _this2.toRadians(angle);
			var geometry = new THREE.RingGeometry(radius, radius - border, 32, 1, 0, rad);
			var material = new THREE.MeshBasicMaterial({ color: "#fff", side: THREE.DoubleSide, opacity: opacity, transparent: true });
			var mesh = new THREE.Mesh(geometry, material);
			return mesh;
		};

		_this2.animate = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
			return _regenerator2.default.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:

							if (_this2.props) {
								if (_this2.props.width != _this2.renderer.width || _this2.props.height != _this2.renderer.height) {
									_this2.updateDimensions();
								}
							}

							_context4.next = 3;
							return _this2.layers.forEach(function (layer) {
								if (layer.update) layer.update(_this2.scene, _this2.camera, _this2.renderer, _this2.utils);
							});

						case 3:

							_this2.animation = requestAnimationFrame(_this2.animate);
							_this2.renderer.render(_this2.scene, _this2.camera);
							_this2.cssRenderer.render(_this2.cssScene, _this2.camera);

						case 6:
						case 'end':
							return _context4.stop();
					}
				}
			}, _callee4, _this3);
		}));

		_this2.update = function () {
			if (_this2.controls) _this2.controls.update();
		};

		_this2.updateDimensions = function () {
			//Get the proportions from screen
			var width = _this2.props.width ? _this2.props.width : window.innerWidth;
			var height = _this2.props.height ? _this2.props.height : window.innerHeight;

			_this2.renderer.setSize(width, height);
			_this2.cssRenderer.setSize(width, height);

			_this2.renderer.setPixelRatio(window.devicePixelRatio);
			_this2.camera.aspect = width / height;
			_this2.camera.updateProjectionMatrix();
		};

		_this2.state = {
			controls: null,
			cssDivs: []
		};

		_this2.addStats = _this2.addStats.bind(_this2);
		window.addEventListener('resize', _this2.updateDimensions.bind(_this2));

		backSide = _this2.props.backSide;
		_this2.layers = [];
		_this2.cssDivs = [];
		var _this = _this2;

		_this2.utils = {
			setCamera: function setCamera(camera) {
				//this.camera = new THREE.PerspectiveCamera(camera);
				//this.camera = new THREE.PerspectiveCamera(50, 100 / 100, 0.01, 10000);
			},
			setCameraPosition: function setCameraPosition(position) {
				//this.camera = new THREE.PerspectiveCamera(50, 1, 0.01, 10000);
				_this2.camera.position.set(position);
			}
		};

		return _this2;
	}

	(0, _createClass3.default)(Viewer3d, [{
		key: 'componentDidMount',
		value: function componentDidMount() {

			this.init();

			if (this.props.stats) this.addStats();
		}
	}, {
		key: 'addStats',
		value: function addStats() {
			var stats = new _statsJs2.default();
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
	}, {
		key: 'componentWillUpdate',
		value: function componentWillUpdate() {
			console.log('updated');
			this.updateDivs();
		}
	}, {
		key: 'render',
		value: function render() {
			//var className = this.props.className ? "env3d" : className;

			return _react2.default.createElement(
				'div',
				{ className: 'env3d' },
				_react2.default.createElement('div', { ref: 'canvas3d', className: 'grid3d' })
			);
		}
	}]);
	return Viewer3d;
}(_react.Component);

exports.default = Viewer3d;