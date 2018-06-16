'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.div3d_resolver = undefined;

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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderer = void 0,
    scene = void 0,
    animation = void 0,
    camera = void 0,
    controls = void 0;

var cssScene = void 0,
    cssRenderer = void 0;

var OrbitControls = require('three-orbit-controls')(THREE);

var counter_id = 0;

var div3d_resolver = exports.div3d_resolver = function div3d_resolver(panel) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new THREE.Vector3(0, 0, 0);

    var width = panel.props.width;
    var height = panel.props.height;

    var style = { height: height, width: width };

    var panelWithProps = _react2.default.cloneElement(panel);

    var cssObject = new _CSS3DRenderer.React_CSS3DObject(panel, panel.props);
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

    counter_id++;
    cssObject.counter_id = counter_id;
    cssObject.name = panel.props.name;

    return cssObject;
};

var Div3d = function (_Component) {
    (0, _inherits3.default)(Div3d, _Component);

    function Div3d(props) {
        (0, _classCallCheck3.default)(this, Div3d);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Div3d.__proto__ || Object.getPrototypeOf(Div3d)).call(this, props));

        _this.setStyle = _this.setStyle.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Div3d, [{
        key: 'setLayer',
        value: function setLayer(layer) {
            this.setState({ layer: layer });
        }
    }, {
        key: 'setStyle',
        value: function setStyle(style) {
            console.log("new style", style);
        }
    }, {
        key: 'render',
        value: function render() {
            var style = this.props.style;

            if (this.props.height && this.props.width && !style) style = { height: this.props.height, width: this.props.width };

            return _react2.default.createElement(
                'div',
                { style: style, width: this.props.width, height: this.props.height, className: 'div-3d' },
                this.props.children
            );
        }
    }]);
    return Div3d;
}(_react.Component);

exports.default = Div3d;