const Mongoose = require('mongoose');

const MemberSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
});
const MemberModel = Mongoose.model('Members', MemberSchema);
module.exports = MemberModel;
