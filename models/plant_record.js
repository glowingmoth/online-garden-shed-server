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
    default: 1
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
  ownedShed: {
    type: Schema.Types.ObjectId,
    ref: 'sheds'
  },
  plantLogs: [{
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
  }]
});

module.exports = mongoose.model('plant_records', PlantRecordSchema);