const mongoose = require('mongoose');
const app = require('./src/app');

mongoose.connect('mongodb://localhost:27017/svested_db', {
  useNewUrlParser: 'true'
});
mongoose.connection.on('error', (err) => {
  console.log('err', err);
});
mongoose.connection.on('connected', (err, res) => {
  console.log('mongoose is connected');
});

const port = 9696;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
