var express = require('express');
var passportConf = require('./passport');
var homeController = require('../app/controllers/home_controller');
var authController = require('../app/controllers/authentication_controller');
var userController = require('../app/controllers/user_controller');
var postController = require('../app/controllers/post_controller');

var router = express.Router();

router.route('/')
  .get(homeController.index.get);

router.route('/about')
  .get(homeController.about.get);

router.route('/explore')
  .get(homeController.explore.get);

router.route('/signup')
  .get(authController.getSignup)
  .post(authController.postSignup);

router.route('/login')
  .get(authController.getLogin)
  .post(authController.postLogin);

router.route('/logout')
  .get(authController.getLogout);

router.route('/forgot_password')
  .get(authController.getForgotPassword)
  .post(authController.postForgotPassword);

router.route('/reset_password/:token')
  .get(authController.getResetPassword)
  .post(authController.postResetPassword);

router.route('/settings/account')
  .get(passportConf.isAuthenticated, userController.getAccount)
  .post(passportConf.isAuthenticated, userController.postUpdateAccount);

router.route('/settings/password')
  .get(passportConf.isAuthenticated, userController.getPassword)
  .post(passportConf.isAuthenticated, userController.postUpdatePassword);

router.route('/settings/delete')
  .get(passportConf.isAuthenticated, userController.getDelete)
  .post(passportConf.isAuthenticated, userController.postDeleteAccount);

router.route('/post')
  .get(passportConf.isAuthenticated, postController.public.get)
  .post(passportConf.isAuthenticated, postController.public.post);

router.route('/entry')
  .get(passportConf.isAuthenticated, postController.private.get)
  .post(passportConf.isAuthenticated, postController.private.post);

router.route('/:user')
  .get(userController.getUserProfile);

router.route('/:user/:hash/:title')
  .get(userController.getPost);

module.exports = router;
