const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {check} = require('express-validator');
const helpersMdw = require('../middlewares/helpers.middleware');

router.post("/loginAnalyst",[
    check("username").not().isEmpty(),
    check("pass").not().isEmpty(),
    helpersMdw.validateErrors
],authController.login);

module.exports = router;
