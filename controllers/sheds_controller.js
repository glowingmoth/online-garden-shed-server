const Shed = require('../models/shed');
const PlantRecord = require('../models/plant_record');
const PlantLog = require('../models/plant_log');

module.exports = {
  index: async (req, res) => {
    const sheds = await Shed.find();
    res.status(200).send(sheds);
  },
  showShed: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const foundShed = await Shed.findById(req.value.params.shedId);
    if (foundShed) {
      res.status(200).send(foundShed);
    } else {
      res.status(400).send({ msg: 'Shed ID not found'});
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
        res.status(400).send({ msg: 'Plant Record ID not found'})
      }
    } else {
      res.status(400).send({ msg: 'Shed ID not found'});
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
        res.status(400).send({ msg: 'Plant Record ID not found'})
      }
    } else {
      res.status(400).send({ msg: 'Shed ID not found'});
    }
  },
  createPlantRecord: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    console.log('req.value.body:', req.value.body);
    const foundShed = await Shed.findById(req.value.params.shedId);
    if (foundShed) {
      if (!foundShed.plantRecords) {
        foundShed.plantRecords = [];
      }
      let newPlantRecord = await PlantRecord.create(req.value.body);
      console.log('newPlantRecord:', newPlantRecord);
      foundShed.plantRecords.unshift(newPlantRecord);
      const updatedShed = await foundShed.save();
      res.status(200).send(updatedShed);
    } else {
      res.status(400).send({ msg: 'Shed ID not found'});
    }
  },
  createPlantLog: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    console.log('req.value.body:', req.value.body);
    const foundShed = await Shed.findById(req.value.params.shedId);
    if (foundShed) {
      const foundPlantRecord = await PlantRecord.findById(req.value.params.plantRecordId);
      if (foundPlantRecord) {
        let newPlantLog = await PlantLog.create(req.value.body);
        console.log('newPlantLog:', newPlantLog);
        if (!foundPlantRecord.plantLogs) {
          foundPlantRecord.plantLogs = [];
        }
        foundPlantRecord.plantLogs.unshift(newPlantLog);
        const updatedPlantRecord = await foundPlantRecord.save();
        res.status(200).send(updatedPlantRecord);
      } else {
        res.status(400).send({ msg: 'Plant Record ID not found'})
      }
    } else {
      res.status(400).send({ msg: 'Shed ID not found'});
    }
  }
}