import React from 'react';

export default props => (
  Object.entries(props).map(([propName, propValue]) => (
    <pre key={propName}>
      {propName}
      <hr />
      {JSON.stringify(propValue, null, 2)}
    </pre>
  ))
);
