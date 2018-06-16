/**
 * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
 * @author mrdoob / http://mrdoob.com/
 * updated by lucascassiano / http://lcassiano.com
 * Adding compatibility with React
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var THREE = require("three");

export let CSS3DObject = function (element) {

    THREE.Object3D.call(this);

    this.element = element;
    this.element.style.position = 'absolute';

    this.addEventListener('removed', function () {

        if (this.element.parentNode !== null) {

            this.element.parentNode.removeChild(this.element);

        }
    });

};

CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);
CSS3DObject.prototype.constructor = CSS3DObject;

export let React_CSS3DObject = function (element, props) {

    THREE.Object3D.call(this);

    this.element = element;
    this.props = props;
    this.rendered = null;
    this.needsUpdate = false;
    var _this = this;
    this.update = function (newElement) {
        _this.element = newElement;
        _this.props = newElement.props;
        _this.needsUpdate = true;
    }
    //this.element.style.position = 'absolute';

    this.addEventListener('removed', function () {

        if (this.element.parentNode !== null) {

            this.element.parentNode.removeChild(this.element);
        }
    });

};

React_CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);
React_CSS3DObject.prototype.constructor = React_CSS3DObject;

export let CSS3DSprite = function (element) {

    CSS3DObject.call(this, element);

};

CSS3DSprite.prototype = Object.create(CSS3DObject.prototype);
CSS3DSprite.prototype.constructor = CSS3DSprite;

export let CSS3DRenderer = function () {

    console.log('THREE.CSS3DRenderer', THREE.REVISION);

    var _width, _height;
    var _widthHalf, _heightHalf;

    var matrix = new THREE.Matrix4();

    var cache = {
        camera: { fov: 0, style: '' },
        objects: {}
    };

    var domElement = document.createElement('div');
    domElement.style.overflow = 'hidden';

    this.domElement = domElement;

    var cameraElement = document.createElement('div');

    cameraElement.style.WebkitTransformStyle = 'preserve-3d';
    cameraElement.style.MozTransformStyle = 'preserve-3d';
    cameraElement.style.transformStyle = 'preserve-3d';

    domElement.appendChild(cameraElement);

    this.setClearColor = function () { };

    this.getSize = function () {

        return {
            width: _width,
            height: _height
        };

    };

    this.setSize = function (width, height) {

        _width = width;
        _height = height;
        _widthHalf = _width / 2;
        _heightHalf = _height / 2;

        domElement.style.width = width + 'px';
        domElement.style.height = height + 'px';

        cameraElement.style.width = width + 'px';
        cameraElement.style.height = height + 'px';

    };

    function epsilon(value) {
        return Math.abs(value) < 1e-10 ? 0 : value;
    }

    function getCameraCSSMatrix(matrix) {

        var elements = matrix.elements;

        return 'matrix3d(' +
            epsilon(elements[0]) + ',' +
            epsilon(-elements[1]) + ',' +
            epsilon(elements[2]) + ',' +
            epsilon(elements[3]) + ',' +
            epsilon(elements[4]) + ',' +
            epsilon(-elements[5]) + ',' +
            epsilon(elements[6]) + ',' +
            epsilon(elements[7]) + ',' +
            epsilon(elements[8]) + ',' +
            epsilon(-elements[9]) + ',' +
            epsilon(elements[10]) + ',' +
            epsilon(elements[11]) + ',' +
            epsilon(elements[12]) + ',' +
            epsilon(-elements[13]) + ',' +
            epsilon(elements[14]) + ',' +
            epsilon(elements[15]) +
            ')';

    }

    function getObjectCSSMatrix(matrix, cameraCSSMatrix, invert = false) {

        var elements = matrix.elements;
        var matrix3d = 'matrix3d(' +
            epsilon(elements[0]) + ',' +
            epsilon(elements[1]) + ',' +
            epsilon(elements[2]) + ',' +
            epsilon(elements[3]) + ',' +
            epsilon(-elements[4]) + ',' +
            epsilon(-elements[5]) + ',' +
            epsilon(-elements[6]) + ',' +
            epsilon(-elements[7]) + ',' +
            epsilon(elements[8]) + ',' +
            epsilon(elements[9]) + ',' +
            epsilon(elements[10]) + ',' +
            epsilon(elements[11]) + ',' +
            epsilon(elements[12]) + ',' +
            epsilon(elements[13]) + ',' +
            epsilon(elements[14]) + ',' +
            epsilon(elements[15]) +
            ')';


            return 'translate(-50%,-50%)' + matrix3d;

    }

    function renderObject(object, camera, cameraCSSMatrix) {
        var style;
        if (object instanceof CSS3DObject) {

            style = getObjectCSSMatrix(object.matrixWorld, cameraCSSMatrix);

            var element = object.element;
            var cachedStyle = cache.objects[object.id] && cache.objects[object.id].style;

            if (cachedStyle === undefined || cachedStyle !== style) {

                element.style.WebkitTransform = style;
                element.style.MozTransform = style;
                element.style.transform = style;

                cache.objects[object.id] = { style: style };
            }

            if (element.parentNode !== cameraElement) {
                cameraElement.appendChild(element);
            }

        }

        if (object instanceof React_CSS3DObject) {


            var element = object.rendered;

            if (!element) {
                style = getObjectCSSMatrix(object.matrixWorld, cameraCSSMatrix);
                element = document.createElement('div');
                ReactDOM.render(object.element, element);
                element.style.width = object.props.width;
                element.style.width = object.props.height;
                element.style.position = 'absolute';
                object.rendered = element;
            }

            if (object.needsUpdate) {
                style = getObjectCSSMatrix(object.matrixWorld, cameraCSSMatrix, true);
                cameraElement.removeChild(object.rendered);
                element = document.createElement('div');
                ReactDOM.render(object.element, element);
                element.style.width = object.props.width;
                element.style.width = object.props.height;
                element.style.position = 'absolute';
                object.rendered = element;
                object.needsUpdate = false;
            }

            var cachedStyle = cache.objects[object.id] && cache.objects[object.id].style;

            if (cachedStyle === undefined || cachedStyle !== style) {
                element.style.WebkitTransform = style;
                element.style.MozTransform = style;
                element.style.transform = style;
                cache.objects[object.id] = { style: style };
            }

            if (element.parentNode !== cameraElement) {
                cameraElement.appendChild(element);
            }

            /*
            style = getObjectCSSMatrix(object.matrixWorld, cameraCSSMatrix);

            var element = object.element;

            var cachedStyle = cache.objects[object.id] && cache.objects[object.id].style;

            if (cachedStyle === undefined || cachedStyle !== style) {

                element.style.WebkitTransform = style;
                element.style.MozTransform = style;
                element.style.transform = style;

                cache.objects[object.id] = { style: style };
            }

            if (element.parentNode !== cameraElement) {
                cameraElement.appendChild(element);
            }
            */
        }

        for (var i = 0, l = object.children.length; i < l; i++) {
            renderObject(object.children[i], camera, cameraCSSMatrix);
        }
    }

    this.render = function (scene, camera) {

        var fov = camera.projectionMatrix.elements[5] * _heightHalf;

        if (cache.camera.fov !== fov) {

            domElement.style.WebkitPerspective = fov + 'px';
            domElement.style.MozPerspective = fov + 'px';
            domElement.style.perspective = fov + 'px';

            cache.camera.fov = fov;
        }

        scene.updateMatrixWorld();

        if (camera.parent === null) camera.updateMatrixWorld();

        var cameraCSSMatrix = 'translateZ(' + fov + 'px)' +
            getCameraCSSMatrix(camera.matrixWorldInverse);

        var style = cameraCSSMatrix +
            'translate(' + _widthHalf + 'px,' + _heightHalf + 'px)';

        if (cache.camera.style !== style) {

            cameraElement.style.WebkitTransform = style;
            cameraElement.style.MozTransform = style;
            cameraElement.style.transform = style;

            cache.camera.style = style;

        }

        renderObject(scene, camera, cameraCSSMatrix);
    };

};