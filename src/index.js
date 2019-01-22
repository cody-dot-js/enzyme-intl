/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */
import { cloneElement } from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow, render } from 'enzyme';

export const mockIntl = {
  defaultLocale: 'en',
  formatDate: (date, options) => `${date}`,
  formatHTMLMessage: ({ id }, options) => id,
  formatMessage: () => ({ id }, options) => id,
  formatNumber: (value, options) => `${value}`,
  formatPlural: (value, options) => `${value}`,
  formatTime: (value, options) => `${value}`,
  formatRelative: (value, options) => `${value}`,
  now: () => 0,
};

const messageProxy = new Proxy({}, { get: (_, property) => property });

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en', messages: messageProxy }, {});
const { intl } = intlProvider.getChildContext();

const intlNode = node => cloneElement(node, { intl });

export const mountWithIntl = (node, { context, childContextTypes, ...options } = {}) => (
  mount(intlNode(node), { context: { ...context, intl }, childContextTypes: { ...childContextTypes, intl: intlShape }, ...options })
);

export const renderWithIntl = (node, { context, childContextTypes, ...options } = {}) => (
  render(intlNode(node), { context: { ...context, intl }, childContextTypes: { ...childContextTypes, intl: intlShape }, ...options })
);

export const shallowWithIntl = (node, { context, ...options } = {}) => (
  shallow(intlNode(node), { context: { ...context, intl }, ...options })
);

export default {
  mockIntl,
  mountWithIntl,
  shallowWithIntl,
  renderWithIntl,
};
