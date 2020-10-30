const express = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { gzipCSS, gzipJS } = require("./middlewares/gzip");
const { deviceMiddleware } = require("./middlewares/device");

const page = require("./routes/page");

const app = express();

const port = process.env.PORT || 3001;

app.get("*.js", gzipJS);

app.get("*.css", gzipCSS);

app.use(express.static("dist"));
app.use(express.static("public"));

app.get("*", deviceMiddleware);

app.get("/", page.render);
app.get("/amp", page.renderAmp);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
