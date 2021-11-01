const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {check} = require('express-validator');
const helpersMdw = require('../middlewares/helpers.middleware');
const helpersAuth = require('../middlewares/auth.middleware');

router.post("/loginAnalyst",[
    check("username").not().isEmpty(),
    check("pass").not().isEmpty(),
    helpersMdw.validateErrors
],authController.login);

router.post("/isvaliduser",[
    check("jwt").not().isEmpty(),
    helpersMdw.validateErrors,
    helpersAuth.isValidUser
],authController.checkUserToken);

module.exports = router;
