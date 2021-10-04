const mongoose = require('mongoose');
const MemberModel = require('../src/model/member');

const data = [{
  name: 'Rubi',
  age: 31,
  gender: 'F'
},
{
  name: 'Randy',
  age: 32,
  gender: 'M'
},
{
  name: 'Apple',
  age: 18,
  gender: 'F'
},
{
  name: 'Mango',
  age: 14,
  gender: 'F'
},
{
  name: 'Ferry',
  age: 37,
  gender: 'M'
},
{
  name: 'Johnson',
  age: 55,
  gender: 'M'
},
{
  name: 'Larry',
  age: 45,
  gender: 'M'
},
{
  name: 'Ryne',
  age: 12,
  gender: 'F'
},
{
  name: 'Christopher',
  age: 24,
  gender: 'M'
}];

mongoose.connect('mongodb://localhost:27017/svested_db', {
  useNewUrlParser: 'true'
});
mongoose.connection.on('error', (err) => {
  console.log('err', err);
  process.exit(1);
});
mongoose.connection.on('connected', (err, res) => {
  console.log('mongoose is connected');
});

MemberModel.deleteMany({}).then(() => {
  MemberModel.create(data).then((res) => {
    console.log(res);
    process.exit(1);
  }).catch((err) => {
    console.log(err);
    process.exit(1);
  });
});
