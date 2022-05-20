const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
router.post('/user-post', userController.add_customer);
router.get('/getdata/:id',userController.get_data_by_id)
router.get('/search', userController.getAllData)
router.get('/get-cities',userController.citiesOfNumber)

module.exports = router; 

