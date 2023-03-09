const express = require('express');
const { verifySignUp, limiters } = require('../middleware');

const signController = require('../controllers/signController');

const router = express.Router();

router.post(
  '/signup',
  [limiters.createAccountLimiter, verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  signController.signup
);

router.post('/signin', [limiters.apiLimiter], signController.signin);

module.exports = router;
