const express = require('express');
const router = express.Router()
const Controller = require('../controller/Controller') 


router.post('/comparision/create', Controller.Comparision_Recursion)
router.get('/comparision/filter', Controller.Comparision_Filter)
router.get('/logical/filter', Controller.Logical_Filter)



module.exports = router