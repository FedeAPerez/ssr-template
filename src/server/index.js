import express from "express";
import { gzipCSS, gzipJS } from "./middlewares/gzip";
import { deviceMiddleware } from "./middlewares/device";

import page from "./routes/page";

const app = express();

const port = process.env.PORT || 3001;

app.get("*.js", gzipJS);

app.get("*.css", gzipCSS);

app.use(express.static("dist"));
app.use(express.static("public"));

app.get("*", deviceMiddleware);

app.get("/", page.render);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
