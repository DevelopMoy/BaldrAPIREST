const express = require('express');
const router = express.Router();
const controller = require('../controllers/places.controller');
const {check} = require('express-validator');
const helpersMdw = require('../middlewares/helpers.middleware');
const authMdw = require('../middlewares/auth.middleware');

router.post("/create",[
    check("latitud").not().isEmpty(),
    check("longitud").not().isEmpty(),
    check("descripcion").not().isEmpty(),
    check("centroUUID").not().isEmpty(),
    check("latitud").isNumeric(),
    check("longitud").isNumeric(),
    helpersMdw.validateErrors,
    authMdw.isAnalyst
],controller.createPlace);

router.post("/veriffy",[
    check("placeUUID").not().isEmpty(),
    check("jwt").not().isEmpty(),
    authMdw.isValidUser,
    helpersMdw.validateErrors
],controller.veriffyPlace);

router.post("/center/create",[
    check("name").not().isEmpty(),
    check("jwt").not().isEmpty(),
    helpersMdw.validateErrors,
    authMdw.isAnalyst
],controller.createCenter)

module.exports = router;
