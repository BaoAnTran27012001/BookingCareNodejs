import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import viewEngine from './config/viewEngine';

import initWebRoute from './routes/web';

import connectDB from './config/connectDB';

const app = express();
// app.use(cors({ credentials:true,origin: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

require('dotenv').config();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewEngine(app);
initWebRoute(app);
connectDB();
const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
