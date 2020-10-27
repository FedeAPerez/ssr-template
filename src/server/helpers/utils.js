const serialize = require('serialize-javascript');
const fs = require('fs');

const cssImport = (href) => (href
  ? `<link
  href="${href}"
  rel="stylesheet"
  type="text/css"
/>`
  : null);

const scriptImport = (src) => (src ? `<script type="text/javascript" src="${src}"></script>` : null);

const faviconImport = (href) => (href ? `<link rel="icon" href=${href} type="image/x-icon" />` : null);

const openHead = () => '<head>';
const closeHead = () => '</head>';
const openBody = () => '<body>';
const closeBody = () => '</body>';

const metaViewport = () => '<meta name="viewport" content="width=device-width,initial-scale=1.0" />';

const metaCharset = () => '<meta charset="utf-8" />';

/*
 *
 */
const addInitialState = (state) => `<script type="text/javascript">window.__PRELOADED_STATE__=${serialize(
  state,
)}</script>`;

const setGlobalGA = (ua) => `<script async src="https://www.googletagmanager.com/gtag/js?id=${ua}"></script>`;

const configGlobalGA = (ua) => `<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ua}', {send_page_view: false});
</script>`;

const trackPageViewGA = () => `<script>
gtag('event', 'page_view');
</script>`;

const setGlobalGO = (opt, experiments) => (experiments
  ? `<script src="https://www.googleoptimize.com/optimize.js?id=${opt}"></script>`
  : '');

const configGlobalGOExperiments = (experiments) => (experiments && experiments.length > 0
  ? `<script>
  ${experiments.map(
    (e) => `gtag('set', {'expId': '${e.id}'}); gtag('set',  {'expVar': '${e.value}'});`,
  )}
  </script>`
  : '');

/* AMP Stuff
 */

const preloadAmp = () => '<link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">';

const loadAmp = () => '<script async src="https://cdn.ampproject.org/v0.js"></script>';

const loadStylesFromFile = (src) => {
  try {
    const styles = fs.readFileSync(src);
    return `<style amp-custom>${styles}</style>`;
  } catch (e) {
    console.log(e);
    return '';
  }
};

const includeAmpBoilerplate = () => '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>';

const linkCanonical = (href) => `<link rel="canonical" href="${href}">`;

module.exports = {
  cssImport,
  scriptImport,
  faviconImport,
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
  preloadAmp,
  loadAmp,
  loadStylesFromFile,
  includeAmpBoilerplate,
  linkCanonical,
};
