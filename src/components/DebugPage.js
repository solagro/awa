import React from 'react';

import Debug from './Debug';
import Layout from './Layout';

import doRedirect from '../hoc/doRedirect';

const DebugPage = props => (
  <Layout>
    <Debug {...props} />
  </Layout>
);

export default doRedirect(DebugPage);
