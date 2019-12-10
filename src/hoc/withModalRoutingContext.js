import React from 'react';
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing';

const withModalContext = WrappedComponent => props => (
  <ModalRoutingContext.Consumer>
    {modalProps => <WrappedComponent modalProps={modalProps} {...props} />}
  </ModalRoutingContext.Consumer>
);

export default withModalContext;
