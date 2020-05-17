const { Router } = require('express');
const router =  Router();
const UsersController = require('../controllers/users');

router.route('/register').post(UsersController.createUser);

router.route('/login').post(UsersController.loginUser);

router.route('/update/:id').put(UsersController.updateUser);

module.exports = router;
