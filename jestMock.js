/**
 * See: https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#jest-mock
 */
const { createElement } = require('react');
const Intl = require.requireActual('react-intl');

const mockIntl = {
  defaultLocale: 'en',
  formatDate: (date, options) => `${date}`,
  formatHTMLMessage: ({ id }, options) => id,
  formatMessage: ({ id }, options) => id,
  formatNumber: (value, options) => `${value}`,
  formatPlural: (value, options) => `${value}`,
  formatTime: (value, options) => `${value}`,
  formatRelative: (value, options) => `${value}`,
  now: () => 0,
};

Intl.injectIntl = (Node) => {
  const renderWrapped = props => createElement(Node, Object.assign({}, props, { intl: mockIntl }));
  renderWrapped.displayName = Node.displayName || Node.name || 'Component';
  return renderWrapped;
};

module.exports = Intl;
