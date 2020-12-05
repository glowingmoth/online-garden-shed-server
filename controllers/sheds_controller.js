const Shed = require('../models/plant_record');

module.exports = {
  index: async (req, res, next) => {
    const sheds = await Shed.find();
    res.status(200)
      .send(sheds);
  },
  show: async (req, res, next) => {

  },
  create: async (req, res, next) => {
    
  }
  
}