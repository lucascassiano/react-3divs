# react_3divs
Divs in 3D as react components 

# install
```
npm install --save react-3divs@latest
```

## import
```js
import { Div3d, Viewer3d, Obj3d, Layer3d } from "react-3divs";
```

#Example
```jsx
 <Viewer3d stats width={600} height={600} >
    <Div3d position={{ x: 10, y: 0, z: 0 }} >
                <h3>2D Content Here</h3>
    </Div3d>
   </Viewer3d>
```
## run example
```
 #clone git
$ cd ./example 
$ npm install && npm start

```

## Simple Use
```jsx
 <Viewer3d stats width={600} height={600} defaultLight grid>
    <Obj3d src={model} mtl={mtl} />
    <Div3d name="div0" position={{ x: 10, y: 0, z: 0 }} >
                <h3>2D Content Here{this.state.counter}</h3>
    </Div3d>
   </Viewer3d>
   
```

