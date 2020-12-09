const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantLogSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  ownedPlantRecord: {
    type: Schema.Types.ObjectId,
    ref: 'plant_records'
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