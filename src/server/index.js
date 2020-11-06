const express = require('express');

const { gzipCSS, gzipJS } = require('./middlewares/gzip');
const { deviceMiddleware } = require('./middlewares/device');

const page = require('./routes/page');

const app = express();

const port = process.env.PORT || 3001;

app.get('*.js', gzipJS);

app.get('*.css', gzipCSS);

app.use(express.static('dist'));
app.use(express.static('public'));

app.get('*', deviceMiddleware);

app.get('/', page.fetch, page.render);
app.get('/amp', page.fetch, page.renderAmp);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
