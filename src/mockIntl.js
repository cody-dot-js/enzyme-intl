const intl = {
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

export default intl;
