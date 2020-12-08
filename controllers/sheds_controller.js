const Shed = require('../models/shed');
const PlantRecord = require('../models/plant_record');

module.exports = {
  index: async (req, res) => {
    const sheds = await Shed.find();
    res.status(200)
      .send(sheds);
  },
  showShed: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const foundShed = await Shed.findById(req.value.params.shedId);
    if (foundShed) {
      res.status(200).send(foundShed);
    } else {
      res.status(400).json({ msg: 'Shed ID not found'});
    }
  },
  showPlantRecord: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const foundShed = await Shed.findById(req.value.params.shedId);
    if (foundShed) {
      const foundPlantRecord = await PlantRecord.findById(req.value.params.plantRecordId);
      if (foundPlantRecord) {
        res.status(200).send(foundPlantRecord);
      } else {
        res.status(400).json({ msg: 'Plant Record ID not found'})
      }
    } else {
      res.status(400).json({ msg: 'Shed ID not found'});
    }
  },
  showLog: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const foundShed = await Shed.findById(req.value.params.shedId);
    if (foundShed) {
      const foundPlantRecord = await PlantRecord.findById(req.value.params.plantRecordId);
      if (foundPlantRecord) {
        res.status(200).send(foundPlantRecord);
      } else {
        res.status(400).json({ msg: 'Plant Record ID not found'})
      }
    } else {
      res.status(400).json({ msg: 'Shed ID not found'});
    }
  },
  createPlantRecord: async (req, res) => {
    
  }
}