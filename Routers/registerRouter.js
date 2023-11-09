const register = require('../Modules/registerModule');
const express = require('express');
const auth = require('../Modules/Authmodule');
const Router = express.Router();

Router.post('/signUp',register.signup);
Router.post('/signin',register.signin);

Router.use('/',auth.AuthenticateUser);
Router.get('/getPackage/:Id',auth.authorizeUser,register.getbytrackingId);
Router.get('/getUsers',auth.authorizeAdmin,register.getUsers);
Router.delete('/user/delete/:id',auth.authorizeAdmin,register.deleteUser);

module.exports = Router;