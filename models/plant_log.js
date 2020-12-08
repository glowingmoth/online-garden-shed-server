const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantLogSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  photos: [{
    photo: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  note: String
})

module.exports = mongoose.model('plant_logs', PlantLogSchema);