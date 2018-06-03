import React from 'react';
import { storiesOf } from '@kadira/storybook';
//import { action } from '@storybook/addon-actions';

import Viewer3d from '../src/components/Viewer3d';
import Div3d from '../src/components/Div3d';

storiesOf('Viewer3d', module)
  .add('Simple', () => (
    <div>
      hello1234
      <Viewer3d position={{x:0,y:0,z:0}} className="grid3d">
        <Div3d position={{x:0 ,y:10, z:0}} width={300} height={300}>
        Hello, add something here
        </Div3d>
        <Div3d position={{x:100 ,y:0, z:-200}} width={300} height={300} />
      </Viewer3d>
     </div>
  ));