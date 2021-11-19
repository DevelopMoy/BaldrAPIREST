const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const controller = require('../controllers/report.controller');
const helpersMdw = require('../middlewares/helpers.middleware');
const helpersMdwDate = require('../middlewares/dateAndTIme.middleware');

router.post("/open",[
    check("userUID").not().isEmpty(),
    check("fechaPrueba").not().isEmpty(),
    check("fechaSintomas").not().isEmpty(),
    check("detalles").not().isEmpty(),
    helpersMdwDate.isValidDateTime("fechaPrueba"),
    helpersMdwDate.isValidDateTime("fechaSintomas"),
    helpersMdw.validateErrors,
    helpersMdwDate.checkDateToleranceBefore("fechaPrueba",process.env.REPORT_DAYS_TOLERANCE),
    helpersMdwDate.checkDateToleranceBefore("fechaSintomas",process.env.REPORT_DAYS_TOLERANCE)
],controller.openReport);

router.post("/riskbyplace",[
    check("locationUID").not().isEmpty()
],controller.getRiskByPlace)


module.exports = router;