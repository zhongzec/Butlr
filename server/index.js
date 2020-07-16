const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const aggregate = require('./src/aggregate');
const count = require('./src/count');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const port = process.env.PORT || 3001;

// const whitelist = [
//   'http://localhost:8080',
//   'http://localhost:3002'
// ];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }

// app.use(cors(corsOptions));

app.use(cors());

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// GET /counts
app.get('/api/counts', async (req, res) => {
  const { start, end, sum } = req.query;
  console.log('GET', req.url);
  const response = await count(start, end, sum);
  console.log(response);
  res.json(response);
});

// GET /aggregates
app.get('/api/aggregates', async (req, res) => {
  const { start, end, every } = req.query;
  console.log('GET', req.url);
  const response = await aggregate(start, end, every);
  console.log(response);
  res.json(response);
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
