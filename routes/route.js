const express = require('express');
const route = express.Router();
const crudController = require('../controllers/crudController');


route.get('/',crudController.getAllData);
route.post('/new',crudController.addData);
route.put('/update',crudController.updateData);
route.post('/delete',crudController.deleteData);


module.exports = route;