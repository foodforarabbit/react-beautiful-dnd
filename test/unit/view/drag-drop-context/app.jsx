// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { canLiftContextKey } from '../../../../src/view/context-keys';

export default class App extends React.Component<*> {
  // Part of reacts api is to use flow types for this.
  // Sadly cannot use flow
  static contextTypes = {
    [canLiftContextKey]: PropTypes.func.isRequired,
  };

  render() {
    return <div>Hi there</div>;
  }
}
