import express from "express";
import React from "react";
import device from "device";

import PageDesktop from "../pages/page/desktop";
import PageMobile from "../pages/page/mobile";
import renderer from "./helpers/renderer";

const app = express();

const port = process.env.PORT || 3001;

app.get("*.js", (req, res, next) => {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  res.set("Content-Type", "text/javascript");
  next();
});

app.get("*.css", (req, res, next) => {
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  res.set("Content-Type", "text/css");
  next();
});

app.use(express.static("dist"));
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  res.locals.device_type = device(req.get("User-Agent")).type;
  next();
});

app.get("*", (req, res, next) => {
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

  renderer(req, res, Component, js, css, null);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
