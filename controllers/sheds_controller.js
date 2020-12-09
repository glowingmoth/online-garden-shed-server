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
    const foundShed = await Shed.findById(req.value.params.shedId).populate('plantRecords').lean();
    if (foundShed) {
      res.status(200).send(foundShed);
    } else {
      res.status(400).send({ msg: 'Shed ID not found'});
    }
  },
  showPlantRecord: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const { shedId, plantRecordId } = req.value.params;

    const foundPlantRecord = await PlantRecord.findById(plantRecordId).populate('plantLogs').lean();
    console.log('foundPlantRecord:', foundPlantRecord);
    if (foundPlantRecord) {
      if (foundPlantRecord.ownedShed == shedId) {
        res.status(200).send(foundPlantRecord);
      } else {
        res.status(400).send({ msg: 'Shed ID does not match'});
      }
    } else {
      res.status(400).send({ msg: 'Plant Record ID not found'})
    }
  },
  showLog: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const { shedId, plantRecordId, logId } = req.value.params;

    const foundPlantRecord = await PlantRecord.findById(plantRecordId).populate('plantLogs').lean();
    console.log('foundPlantRecord:', foundPlantRecord);
    if (foundPlantRecord) {
      if (foundPlantRecord.ownedShed == shedId) {
        if (foundPlantRecord.plantLogs) {
          const foundLog = foundPlantRecord.plantLogs.find(plantLog => plantLog._id == logId);
          if (foundLog) {
            res.status(200).send(foundLog);
          } else {
            res.status(400).send({ msg: 'Plant Log ID not found'})
          }
        } else {
          res.status(400).send({ msg: 'Plant Log ID not found'})
        }
      } else {
        res.status(400).send({ msg: 'Shed ID does not match'});
      }
    } else {
      res.status(400).send({ msg: 'Plant Record ID not found'})
    }
  },
  createPlantRecord: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    console.log('req.value.body:', req.value.body);
    const { shedId } = req.value.params;

    const foundShed = await Shed.findById(shedId);
    if (foundShed) {
      let newPlantRecord = new PlantRecord(req.value.body);
      newPlantRecord.ownedShed = foundShed;
      const createdPlantRecord = await newPlantRecord.save();
      console.log('createdPlantRecord:', createdPlantRecord);
      if (!foundShed.plantRecords) {
        foundShed.plantRecords = [];
      }
      foundShed.plantRecords.unshift(createdPlantRecord);
      const updatedShed = await foundShed.save();
      res.status(200).send(createdPlantRecord);
    } else {
      res.status(400).send({ msg: 'Shed ID not found'});
    }
  },
  createPlantLog: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    console.log('req.value.body:', req.value.body);
    const { shedId, plantRecordId } = req.value.params;

    const foundPlantRecord = await PlantRecord.findById(plantRecordId).populate('plantLogs').lean();
    if (foundPlantRecord) {
      if (foundPlantRecord.ownedShed == shedId) {
        let newPlantLog = new PlantLog(req.value.body);
        newPlantLog.ownedPlantRecord = foundPlantRecord;
        const createdPlantLog = await newPlantLog.save();
        console.log('createdPlantLog:', createdPlantLog);
        if (!foundPlantRecord.plantLogs) {
          foundPlantRecord.plantLogs = [];
        }
        foundPlantRecord.plantLogs.unshift(newPlantLog);
        const updatedPlantRecord = await foundPlantRecord.save();
        res.status(200).send(updatedPlantRecord);
      } else {
        res.status(400).send({ msg: 'Shed ID does not match'});
      }
    } else {
      res.status(400).send({ msg: 'Plant Record ID not found'})
    }
  }
}