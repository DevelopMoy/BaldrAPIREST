const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const controller = require('../controllers/visit.controller');
const dateMiddlewares = require('../middlewares/dateAndTIme.middleware');
const helpersMdw = require('../middlewares/helpers.middleware');

router.post("/create",[
    check("userJWT").not().isEmpty(),
    check("entrada").not().isEmpty(),
    dateMiddlewares.isValidDateTime("entrada"),
    check("lugarUID").not().isEmpty(),
    helpersMdw.validateErrors,
    dateMiddlewares.checkDateWithTolerance("entrada",process.env.DAYS_TOLERANCE_VALIDATION) // tolerance in days, +- value
],controller.createVisit);

router.post("/exit",[
    check("exitTime").not().isEmpty(),
    check("visitUID").not().isEmpty(),
    dateMiddlewares.isValidDateTime("exitTime"),
    helpersMdw.validateErrors,
    dateMiddlewares.checkDateWithTolerance("exitTime",process.env.DAYS_TOLERANCE_VALIDATION)
],controller.saveExitTime);

module.exports = router;
