const React = require('react');
const { hydrate } = require('react-dom');
const Page = require('../../pages/page/mobile');
require('../../pages/page/styles/mobile.scss');

const preloadedState = window.__PRELOADED_STATE__;

hydrate(
  <Page initialState={{ ...preloadedState }} />,
  document.getElementById('root'),
);
