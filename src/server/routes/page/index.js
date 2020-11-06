const React = require('react');

const PageDesktop = require('../../../pages/page/desktop');
const PageMobile = require('../../../pages/page/mobile');
const { render } = require('../../helpers/renderer');
const { ampRender } = require('../../helpers/amp-renderer');

const fetchPage = (req, res, next) => {
  res.locals.initialState = {
    title: `We're in ${process.env.NODE_ENV}`,
  };

  next();
};

const renderPage = (req, res) => {
  const { device_type, initialState } = res.locals;

  let Component; let css; let
    js;

  if (device_type === 'phone') {
    Component = <PageMobile initialState={initialState} />;
    js = 'page.mobile.js';
    css = 'page.mobile.css';
  } else {
    Component = <PageDesktop initialState={initialState} />;
    js = 'page.desktop.js';
    css = 'page.desktop.css';
  }

  render({
    req,
    res,
    page: Component,
    script: js,
    style: css,
    state: initialState,
  });
};

const renderPageAmp = (req, res) => {
  const { device_type, initialState } = res.locals;

  let Component; let css;

  if (device_type === 'phone') {
    Component = <PageMobile initialState={initialState} />;
    css = 'page.mobile.css';
  } else {
    Component = <PageDesktop initialState={initialState} />;
    css = 'page.desktop.css';
  }

  ampRender({
    req,
    res,
    page: Component,
    style: css,
    meta: { canonicalLink: '/' },
  });
};

const page = {
  fetch: fetchPage,
  render: renderPage,
  renderAmp: renderPageAmp,
};

module.exports = page;
