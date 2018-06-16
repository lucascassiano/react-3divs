'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.obj3d_resolver = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _threeReactObjLoader = require('three-react-obj-loader');

var _threeReactObjLoader2 = _interopRequireDefault(_threeReactObjLoader);

var _threeReactMtlLoader = require('three-react-mtl-loader');

var _threeReactMtlLoader2 = _interopRequireDefault(_threeReactMtlLoader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var obj3d_resolver = exports.obj3d_resolver = function obj3d_resolver(element) {
    var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new THREE.Vector3(0, 0, 0);
    var material = arguments[2];


    return new Promise(function (resolve, reject) {

        var objLoader = new _threeReactObjLoader2.default();

        var source_obj = element.props.src;
        var source_mtl = element.props.mtl;

        if (source_mtl) {
            var mtlLoader = new _threeReactMtlLoader2.default();
            mtlLoader.load(source_mtl, function (materials) {
                materials.preload();

                var objLoader = new _threeReactObjLoader2.default();
                objLoader.setMaterials(materials);

                objLoader.load(source_obj, function (object) {
                    resolve(object);
                });
            });
        } else objLoader.load(source_obj, function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(object) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:

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

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function (_x2) {
                return _ref.apply(this, arguments);
            };
        }());
    });
};

var Obj3d = function (_Component) {
    (0, _inherits3.default)(Obj3d, _Component);

    function Obj3d(props) {
        (0, _classCallCheck3.default)(this, Obj3d);
        return (0, _possibleConstructorReturn3.default)(this, (Obj3d.__proto__ || Object.getPrototypeOf(Obj3d)).call(this, props));
    }

    (0, _createClass3.default)(Obj3d, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', null);
        }
    }]);
    return Obj3d;
}(_react.Component);

exports.default = Obj3d;