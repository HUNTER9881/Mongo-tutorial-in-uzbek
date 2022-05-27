const express = require('express');
const router = express.Router()
const Aggregate = require('../controller/Aggregate') 


router.post('/create', Aggregate.createData)
router.post('/worker', Aggregate.createWorkers)
router.get('/facet', Aggregate.facet)
router.get('/bucket', Aggregate.bucket)
router.get('/bucketAuto', Aggregate.bucketAuto)



module.exports = router