const Shed = require('../models/shed');
const PlantRecord = require('../models/plant_record');

// make the same format with Joi
const sendErrMsg = (res, msg) => res.status(400).send({ details: [{ message: msg }] });

module.exports = {
  index: async (req, res) => {
    const sheds = await Shed.find()
      .populate({ path: 'plantRecords', options: { sort: { createdAt: 'desc' } } })
      .populate('owner');
    res.status(200).send(sheds);
  },
  showShed: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const foundShed = await Shed.findById(req.value.params.shedId)
      .populate({ path: 'plantRecords', options: { sort: { createdAt: 'desc' } } })
      .populate('owner');
    if (foundShed) {
      res.status(200).send(foundShed);
    } else {
      sendErrMsg(res, 'Shed ID not found');
    }
  },
  showPlantRecord: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const { shedId, plantRecordId } = req.value.params;

    const foundPlantRecord = await PlantRecord.findById(plantRecordId).lean();
    console.log('foundPlantRecord:', foundPlantRecord);
    if (foundPlantRecord) {
      if (foundPlantRecord.ownedShed == shedId) {
        res.status(200).send(foundPlantRecord);
      } else {
        sendErrMsg(res, 'Shed ID does not match');
      }
    } else {
      sendErrMsg(res, 'Plant Record ID not found');
    }
  },
  showLog: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const { shedId, plantRecordId, logId } = req.value.params;

    const foundPlantRecord = await PlantRecord.findById(plantRecordId).lean();
    console.log('foundPlantRecord:', foundPlantRecord);
    if (foundPlantRecord) {
      if (foundPlantRecord.ownedShed == shedId) {
        if (foundPlantRecord.plantLogs) {
          const foundLog = foundPlantRecord.plantLogs.find(plantLog => plantLog._id == logId);
          if (foundLog) {
            res.status(200).send(foundLog);
          } else {
            sendErrMsg(res, 'Plant Log ID not found');
          }
        } else {
          sendErrMsg(res, 'Plant Log ID not found');
        }
      } else {
        sendErrMsg(res, 'Shed ID does not match');
      }
    } else {
      sendErrMsg(res, 'Plant Record ID not found');
    }
  },
  createPlantRecord: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    console.log('req.value.body:', req.value.body);
    const { shedId } = req.value.params;

    const foundShed = await Shed.findById(shedId);
    if (foundShed) {
      // create a new plant record
      let newPlantRecord = new PlantRecord(req.value.body);
      newPlantRecord.ownedShed = foundShed._id;
      const createdPlantRecord = await newPlantRecord.save();
      console.log('createdPlantRecord:', createdPlantRecord);
      // link the plant record to shed
      if (!foundShed.plantRecords) {
        foundShed.plantRecords = [];
      }
      foundShed.plantRecords.unshift(createdPlantRecord);
      const updatedShed = await foundShed.save();
      res.status(200).send(createdPlantRecord);
    } else {
      sendErrMsg(res, 'Shed ID not found');
    }
  },
  createPlantLog: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    console.log('req.value.body:', req.value.body);
    const { shedId, plantRecordId } = req.value.params;

    const foundPlantRecord = await PlantRecord.findById(plantRecordId);
    if (foundPlantRecord) {
      if (foundPlantRecord.ownedShed == shedId) {
        // create a new log
        let newPlantLog = {...req.value.body};
        // link the log to the plant record
        if (!foundPlantRecord.plantLogs) {
          foundPlantRecord.plantLogs = [];
        }
        foundPlantRecord.plantLogs.unshift(newPlantLog);
        console.log('foundPlantRecord:', foundPlantRecord);
        const updatedPlantRecord = await foundPlantRecord.save();
        res.status(200).send(updatedPlantRecord.plantLogs[0]);
      } else {
        sendErrMsg(res, 'Shed ID does not match');
      }
    } else {
      sendErrMsg(res, 'Plant Record ID not found');
    }
  },
  updatePlantRecord: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    console.log('req.value.body:', req.value.body);
    const { shedId, plantRecordId } = req.value.params;

    const foundPlantRecord = await PlantRecord.findById(plantRecordId);
    if (foundPlantRecord) {
      if (foundPlantRecord.ownedShed == shedId) {
        Object.keys(req.value.body).forEach(key => foundPlantRecord[key] = req.value.body[key]);
        await foundPlantRecord.save();
        res.status(200).send(foundPlantRecord);
      } else {
        sendErrMsg(res, 'Shed ID does not match');
      }
    } else {
      sendErrMsg(res, 'Plant Record ID not found');
    }
  },
  updatePlantLog: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    console.log('req.value.body:', req.value.body);
    const { shedId, plantRecordId, logId } = req.value.params;

    const foundPlantRecord = await PlantRecord.findById(plantRecordId);
    if (foundPlantRecord) {
      if (foundPlantRecord.ownedShed == shedId) {
        const { plantLogs } = foundPlantRecord;
        if (plantLogs) {
          const foundPlantLog = plantLogs.find(plantLog => plantLog._id == logId);
          if (foundPlantLog) {
            Object.keys(req.value.body).forEach(key => foundPlantLog[key] = req.value.body[key]);
            await foundPlantRecord.save();
            res.status(200).send(foundPlantLog);
          } else {
            sendErrMsg(res, 'Plant Log ID not found');
          }
        } else {
          sendErrMsg(res, 'Plant logs are empty');
        }
      } else {
        sendErrMsg(res, 'Shed ID does not match');
      }
    } else {
      sendErrMsg(res, 'Plant Record ID not found');
    }
  },
  removePlantRecord: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const { shedId, plantRecordId } = req.value.params;

    await PlantRecord.findByIdAndDelete(plantRecordId);

    const foundShed = await Shed.findById(shedId);
    if (foundShed) {
      if (foundShed.plantRecords) {
        foundShed.plantRecords = foundShed.plantRecords.filter(plantRecord => plantRecord._id != plantRecordId);
        await foundShed.save();
      }
      res.status(200).send(foundShed);
    } else {
      sendErrMsg(res, 'Shed ID does not match');
    }
  },
  removePlantLog: async (req, res) => {
    console.log('req.value.params:', req.value.params);
    const { shedId, plantRecordId, logId } = req.value.params;

    const foundPlantRecord = await PlantRecord.findById(plantRecordId);
    if (foundPlantRecord) {
      if (foundPlantRecord.ownedShed == shedId) {
        let { plantLogs } = foundPlantRecord;
        if (plantLogs) {
          foundPlantRecord.plantLogs = plantLogs.filter(plantLog => plantLog._id != logId);
          res.status(200).send(foundPlantRecord);
        } else {
          sendErrMsg(res, 'Plant logs are empty');
        }
      } else {
        sendErrMsg(res, 'Shed ID does not match');
      }
    } else {
      sendErrMsg(res, 'Plant Record ID not found');
    }
  }
}