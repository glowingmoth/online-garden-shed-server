const Joi = require('joi');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = schema.validate({
        param: req.params[name]
      })

      if (result.error) {
        return res.status(400).send(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value.params) {
          req.value.params = {};
        }
        req.value.params[name] = result.value.param;
        next();
      }
    }
  },
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).send(result.error);
      }
      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    }
  },
  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    createPlantRecordSchema: Joi.object().keys({
      commonName: Joi.string().max(100).required(),
      scientificName: Joi.string().max(100).required(),
      familyCommonName: Joi.string().max(100).required(),
      description: Joi.string().max(1000).required(),
      recordPhoto: Joi.string().required()
    }),
    updatePlantRecordSchema: Joi.object().keys({
      commonName: Joi.string().max(100),
      scientificName: Joi.string().max(100),
      familyCommonName: Joi.string().max(100),
      description: Joi.string().max(1000),
      recordPhoto: Joi.string()
    }),
    createPlantLogSchema: Joi.object().keys({
      note: Joi.string().max(1000),
      photos: Joi.array().min(1).max(5)
    }),
    updatePlantLogSchema: Joi.object().keys({
      note: Joi.string().max(1000),
      photos: Joi.array()
    })

  }
}