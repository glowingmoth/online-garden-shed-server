const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShedSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  plantRecords: [{
    type: Schema.Types.ObjectId,
    ref: 'plant_records'
  }]
});

module.exports = mongoose.model('sheds', ShedSchema);