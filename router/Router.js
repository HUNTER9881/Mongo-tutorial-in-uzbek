const express = require('express');
const router = express.Router()
const Controller = require('../controller/Controller') 


router.post('/create', Controller.Comparision_Recursion)
router.get('/comparision/filter', Controller.Comparision_Filter)
router.get('/logical/filter', Controller.Logical_Filter)
router.get('/element/query', Controller.ElementQuery)
router.get('/aggregate', Controller.Aggrgeate)



module.exports = router