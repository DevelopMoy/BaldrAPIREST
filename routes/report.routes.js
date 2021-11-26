const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const controller = require('../controllers/report.controller');
const helpersMdw = require('../middlewares/helpers.middleware');
const helpersMdwDate = require('../middlewares/dateAndTIme.middleware');

router.post("/open",[
    check("userJWT").not().isEmpty(),
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
],controller.getRiskByPlace);

router.post("/reportsyear",[
    // Pending to add jwt auth
    check("year").not().isEmpty()
],controller.getRiskPerYear)

router.post("/riskplaces",[
// Pending to add jwt auth
],controller.getPlacesRisk);

router.post("/reportscenter",[
    // Pending to add jwt auth
],controller.getCenterReport);

module.exports = router;