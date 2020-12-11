const express = require('express');
const router = require('express-promise-router')();
const { validateParam, validateBody, schemas } = require('../helpers/route_helpers');

const ShedsController = require('../controllers/sheds_controller');

router.route('/')
  .get(ShedsController.index);

router.route('/:shedId')
  .get(validateParam(schemas.idSchema, 'shedId'),
    ShedsController.showShed
  );

router.route('/:shedId/records')
  .post(validateParam(schemas.idSchema, 'shedId'),
    validateBody(schemas.createPlantRecordSchema),
    ShedsController.createPlantRecord
  );

router.route('/:shedId/records/:plantRecordId')
  .get(validateParam(schemas.idSchema, 'shedId'),
    validateParam(schemas.idSchema, 'plantRecordId'),
    ShedsController.showPlantRecord
  ).put(validateParam(schemas.idSchema, 'shedId'),
    validateParam(schemas.idSchema, 'plantRecordId'),
    validateBody(schemas.updatePlantRecordSchema),
    ShedsController.updatePlantRecord
  ).delete(validateParam(schemas.idSchema, 'shedId'),
    validateParam(schemas.idSchema, 'plantRecordId'),
    ShedsController.removePlantRecord
  );

router.route('/:shedId/records/:plantRecordId/logs')
  .post(validateParam(schemas.idSchema, 'shedId'),
    validateParam(schemas.idSchema, 'plantRecordId'),
    validateBody(schemas.createPlantLogSchema),
    ShedsController.createPlantLog
  );

router.route('/:shedId/records/:plantRecordId/logs/:logId')
  .get(validateParam(schemas.idSchema, 'shedId'),
    validateParam(schemas.idSchema, 'plantRecordId'),
    validateParam(schemas.idSchema, 'logId'),
    ShedsController.showLog
  ).put(validateParam(schemas.idSchema, 'shedId'),
    validateParam(schemas.idSchema, 'plantRecordId'),
    validateParam(schemas.idSchema, 'logId'),
    validateBody(schemas.updatePlantLogSchema),
    ShedsController.updatePlantLog
  ).delete(validateParam(schemas.idSchema, 'shedId'),
    validateParam(schemas.idSchema, 'plantRecordId'),
    validateParam(schemas.idSchema, 'logId'),
    ShedsController.removePlantLog
  );

module.exports = router;