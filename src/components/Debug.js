import React from 'react';
import doRedirect from '../hoc/doRedirect';

const Debug = props => (
  <pre>
    {JSON.stringify(props, null, 2)}
  </pre>
);

export default doRedirect(Debug);
