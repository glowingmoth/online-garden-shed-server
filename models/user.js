const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  photo: String,
  shed: {
    type: Schema.Types.ObjectId,
    ref: 'sheds'
  },
  followingSheds:[{
    type: Schema.Types.ObjectId,
    ref: 'sheds'
  }],
  followingPlantRecords:[{
    type: Schema.Types.ObjectId,
    ref: 'plant_records'
  }]
});

module.exports = mongoose.model('users', UserSchema);