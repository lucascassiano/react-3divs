import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import HTML3D from 'react-three-renderer-html3d/lib/HTML3D';

class Simple extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      /*
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });*/
    };
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    // or you can use:
    //width = window.innerWidth
    //height = window.innerHeight

    return (
      <React3
        mainCamera="camera" // this points to the perspectiveCamera below
        width={width}
        height={height}
        onAnimate={this._onAnimate}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
          />
          <mesh
            rotation={this.state.cubeRotation}
          >
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <meshBasicMaterial
              color={0x00ff00}
            />

            <HTML3D
              position={new THREE.Vector3()}
              rotation={new THREE.Euler()}
            >
              <div>my custom HTML</div>
            </HTML3D>


          </mesh>
        </scene>
      </React3>);
  }
}

export default Simple;