const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantRecordSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  recordNum: {
    type: Number,
    required: true,
    default: 0
  },
  commonName: {
    type: String
  },
  scientificName: {
    type: String
  },
  familyCommonName: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  recordPhoto: {
    type: String,
    required: true
  },
  plantLogs: [{
    createdAt: {
      type: Date,
      default: Date.now
    },
    photos: [{
      photo: String,
      note: String,
      isMain: {
        type: Boolean,
        default: false
      }
    }]
  }]
})

module.exports = mongoose.model('plant_records', PlantRecordSchema);