import React from 'react';
import doRedirect from '../hoc/doRedirect';

const Debug = props => (
  Object.entries(props).map(([propName, propValue]) => (
    <pre key={propName}>
      {propName}
      <hr />
      {JSON.stringify(propValue, null, 2)}
    </pre>
  ))
);

export default doRedirect(Debug);
