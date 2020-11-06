const React = require('react');
const { hydrate } = require('react-dom');
const Page = require('../../pages/page/desktop');
require('../../pages/page/styles/desktop.scss');

const preloadedState = window.__PRELOADED_STATE__;

hydrate(
  <Page initialState={{ ...preloadedState }} />,
  document.getElementById('root'),
);
