const React = require("react");

const PageDesktop = require("../../../pages/page/desktop");
const PageMobile = require("../../../pages/page/mobile");
const { render } = require("../../helpers/renderer");
const { ampRender } = require("../../helpers/amp-renderer");

const renderPage = (req, res, next) => {
  const { device_type } = res.locals;

  let Component, css, js;

  if (device_type === "phone") {
    Component = <PageMobile />;
    js = "page.mobile.js";
    css = "page.mobile.css";
  } else {
    Component = <PageDesktop />;
    js = "page.desktop.js";
    css = "page.desktop.css";
  }

  render({ req, res, page: Component, script: js, style: css });
};

const renderPageAmp = (req, res, next) => {
  const { device_type } = res.locals;

  let Component, css, js;

  if (device_type === "phone") {
    Component = <PageMobile />;
    css = "page.mobile.css";
  } else {
    Component = <PageDesktop />;
    css = "page.desktop.css";
  }

  ampRender({
    req,
    res,
    page: Component,
    style: css,
    meta: { canonicalLink: "/" },
  });
};

const page = {
  render: renderPage,
  renderAmp: renderPageAmp,
};

module.exports = page;
