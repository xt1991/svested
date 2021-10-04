const express = require('express');
var cors = require('cors');
const MemberControllers = require('./controller/member');

const app = express();
app.use(cors());
app.use(express.json());

var corsOptions = {
  origin: 'http://localhost:3000/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get('/', cors(corsOptions), (req, res) => {
  res.send('Hello Member!');
});

app.route('/bar')
  .get((req, res) => MemberControllers.getBar()
    .then((result) => res.json(result))
    .catch((err) => res.status(422).json(err)));

app.route('/pie')
  .get((req, res) => MemberControllers.getPie()
    .then((result) => res.json(result))
    .catch((err) => res.status(422).json(err)));

app.route('/chart')
  .get((req, res) => MemberControllers.getChart()
    .then((result) => res.json(result))
    .catch((err) => res.status(422).json(err)))
  .post((req, res) => MemberControllers.setChart(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.status(422).json(err)));

module.exports = app;
