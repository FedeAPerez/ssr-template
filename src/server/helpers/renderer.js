const { renderToString } = require("react-dom/server");
const { Helmet } = require("react-helmet");
const {
  cssImport,
  faviconImport,
  scriptImport,
  openHead,
  closeHead,
  openBody,
  closeBody,
  metaViewport,
  metaCharset,
  addInitialState,
  setGlobalGA,
  configGlobalGA,
  trackPageViewGA,
  setGlobalGO,
  configGlobalGOExperiments,
} = require("./utils");

const render = ({ res, page, script, style, state = null, experiments }) => {
  const content = renderToString(page);
  const helmet = Helmet.renderStatic();

  let html = "";
  html += "<!doctype html>";
  html += `<html ${helmet.htmlAttributes.toString()}>`;
  html += openHead();
  html += `${helmet.title.toString()}`;
  html += `${helmet.meta.toString()}`;
  html += `${helmet.link.toString()}`;
  html += faviconImport("/favicon.ico");
  html += cssImport(style);
  html += addInitialState(state);
  html += setGlobalGA("XXX");
  html += configGlobalGA("XXX");
  html += setGlobalGO("XXX", experiments);
  html += configGlobalGOExperiments(experiments);
  html += trackPageViewGA();
  html += metaCharset();
  html += metaViewport();
  html += closeHead();
  html += openBody();
  html += `<div id="root">${content}</div>`;
  html += scriptImport(script);
  html += closeBody();
  html += "</html>";

  res.send(html);
};

module.exports = { render };
