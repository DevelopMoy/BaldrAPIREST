const express = require('express');
const helpersMdw = require('../middlewares/helpers.middleware');
const {check} = require('express-validator');
const router = express.Router();
const controller = require('../controllers/user.controller');
const authMdw = require('../middlewares/auth.middleware');

router.post("/list",[
    check("jwt").not().isEmpty(),
    helpersMdw.validateErrors,
    authMdw.isAnalyst
],controller.getAllUsers);

router.post("",[
    check('birthDate').not().isEmpty(),
    check('birthDate').custom(helpersMdw.checkDate),
    helpersMdw.validateErrors
],controller.createUser);

module.exports = router;
