const express = require('express');
const router = require('express-promise-router')();
const { validateParam, validateBody, schemas } = require('../helpers/route_helpers');

const ShedsController = require('../controllers/sheds_controller');

router.route('/')
  .get(ShedsController.index);

router.route('/:shedId')
  .get(validateParam(schemas.idSchema, 'shedId'), ShedsController.showShed)
  .post(validateParam(schemas.idSchema, 'shedId'),
    validateBody(schemas.createPlantRecordSchema),
    ShedsController.createPlantRecord);

router.route('/:shedId/:plantRecordId')
  .get(validateParam(schemas.idSchema, 'shedId'),
    validateParam(schemas.idSchema, 'plantRecordId'),
    ShedsController.showPlantRecord
  )

module.exports = router;