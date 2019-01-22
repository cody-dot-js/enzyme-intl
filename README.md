# enzyme-intl

[![NPM Version](https://img.shields.io/npm/v/enzyme-intl.svg?style=for-the-badge&logo=npm)](https://www.npmjs.org/package/enzyme-intl)

Enzyme helpers for fortifying tests that depend on react-intl by decoupling the need for actual translations. See: [react-intl documentation](https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#helper-function-1)

## Installation

npm:

```sh
npm install -D enzyme-intl
```

or

Yarn:

```sh
yarn add -D enzyme-intl
```

## Usage

```jsx
import { shallowWithIntl, mountWithIntl } from 'enzyme-intl';

const shallowWrapper = shallowWithIntl(<CustomComponent />);
const mountWrapper = mountWithIntl(<CustomComponent />);

expect(shallowWrapper).toMatchSnapshot(); // OK, doesn't depend on real translations
expect(mountWrapper).toMatchSnapshot(); // OK, doesn't depend on real translations
```

### Mock Intl

For testing methods that depend on `react-intl` `intlShape`:

```js
import { mockIntl } from 'enzyme-intl';
import foo from '../foo';

const result = foo(mockIntl);
expect(result).toMatchSnapshot(); // OK, doesn't depend on real translations
```

### Jest Mock

In order to mock out calls to the `react-intl` api in Jest, you can copy the following into your root `__mocks__` folder.

```js
// root-app-folder/__mocks__/react-intl.js
/**
 * See: https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#jest-mock
 */
import React from 'react';

const mockIntl = {
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

const Intl = require.requireActual('react-intl');

Intl.injectIntl = (Node) => {
  const renderWrapped = props => <Node {...props} intl={mockIntl} />;
  renderWrapped.displayName = Node.displayName || Node.name || 'Component';
  return renderWrapped;
};

module.exports = Intl;
```

See: [react-intl jest-mock documentation](https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#jest-mock)
