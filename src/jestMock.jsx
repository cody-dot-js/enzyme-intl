/**
 * See: https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#jest-mock
 */
import React from 'react';
import mockIntl from './mockIntl';

const Intl = require.requireActual('react-intl');

Intl.injectIntl = (Node) => {
  const renderWrapped = props => <Node {...props} intl={mockIntl} />;
  renderWrapped.displayName = Node.displayName || Node.name || 'Component';
  return renderWrapped;
};

export default Intl;
