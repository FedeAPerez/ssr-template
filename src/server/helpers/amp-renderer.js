const { renderToString } = require("react-dom/server");
const path = require("path");
const { Helmet } = require("react-helmet");
const {
  faviconImport,
  openHead,
  closeHead,
  openBody,
  closeBody,
  metaViewport,
  metaCharset,
  preloadAmp,
  loadAmp,
  includeAmpBoilerplate,
  loadStylesFromFile,
  linkCanonical,
} = require("./utils");

const ampRenderer = ({ res, page, style, meta }) => {
  const content = renderToString(page);
  const helmet = Helmet.renderStatic();

  let html = "";
  html += "<!doctype html>";
  html += '<html ⚡ lang="es">';
  html += openHead();
  html += `${helmet.title.toString()}`;
  html += `${helmet.meta.toString()}`;
  html += `${helmet.link.toString()}`;
  html += includeAmpBoilerplate();
  html += preloadAmp();
  html += loadAmp();
  html += loadStylesFromFile(path.join(process.cwd(), "dist", style));
  html += faviconImport("/favicon.ico");
  html += metaCharset();
  html += metaViewport();
  html += linkCanonical(meta.canonicalLink);
  html += closeHead();
  html += openBody();
  html += `<div id="root">${content}</div>`;
  html += closeBody();
  html += "</html>";

  res.send(html);
};

module.exports = { ampRenderer };
