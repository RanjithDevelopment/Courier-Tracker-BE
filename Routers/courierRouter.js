const package = require('../Modules/courierModule');
const express = require('express');

const Router = express.Router();

Router.post('/addPackage',package.addPackage);
Router.get('/getPackages',package.getPackages);
Router.put('/update/:id',package.updatePackage);
Router.delete('/delete/:id',package.DeletePackage);
module.exports = Router;