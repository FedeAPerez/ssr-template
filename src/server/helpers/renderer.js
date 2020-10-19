import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import serialize from "serialize-javascript";

export default (req, res, page, script, style, state = null) => {
  const content = renderToString(page);
  const helmet = Helmet.renderStatic();

  const html = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()} lang="es">
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <link rel="icon" href="favicon.ico" type="image/x-icon" />
          <link
            href="${style}"
            rel="stylesheet"
            type="text/css"
          />
          <script type="text/javascript">window.__PRELOADED_STATE__=${serialize(
            state
          )}</script>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        </head>
        <body>
          <div id="root">${content}</div>
          <script type="text/javascript" src="${script}"></script>
        </body>
    </html>
`;

  res.send(html);
};
