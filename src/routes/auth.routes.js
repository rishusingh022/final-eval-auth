const {
  registerUser,
  loginUser,
  validateUserToken,
} = require('../controllers/auth.controller.js');
const {
  validateUser,
  validateJwt,
} = require('../middlewares/auth.validator.js');
const express = require('express');

const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', validateUser, loginUser);
router.post('/validate', validateJwt, validateUserToken);

module.exports = router;
