const express = require('express');
const router = express.Router()
const Controller = require('../controller/Controller') 


router.post('/create', Controller.Comparision_Recursion)
router.get('/comparision/filter', Controller.Comparision_Filter)
router.get('/logical/filter', Controller.Logical_Filter)
router.get('/element/query', Controller.ElementQuery)
router.get('/aggregate', Controller.Aggregeate)
router.get('/addFields', Controller.addField)
router.get('/unwind', Controller.unwind)
router.get('/unset', Controller.unset)
router.get('/sort', Controller.sortElement)
router.get('/skip', Controller.skipElement)
router.get('/sample', Controller.sample)
router.get('/replaceWith', Controller.replaceWith)
router.get('/all', Controller.all)



module.exports = router