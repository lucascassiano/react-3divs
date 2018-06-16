'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.layer3d_resolver = undefined;

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

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var layer3d_resolver = exports.layer3d_resolver = function layer3d_resolver(object) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new THREE.Vector3(0, 0, 0);

    var exp_layer = { setup: object.props.setup, update: object.props.update };
    if (object.props.layer) {
        var layer = new object.props.layer();
        exp_layer = { setup: layer.setup, update: layer.update };
    }
    return exp_layer;
};

var Layer3d = function (_Component) {
    (0, _inherits3.default)(Layer3d, _Component);

    function Layer3d(props) {
        (0, _classCallCheck3.default)(this, Layer3d);
        return (0, _possibleConstructorReturn3.default)(this, (Layer3d.__proto__ || Object.getPrototypeOf(Layer3d)).call(this, props));
    }

    (0, _createClass3.default)(Layer3d, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);
    return Layer3d;
}(_react.Component);

exports.default = Layer3d;