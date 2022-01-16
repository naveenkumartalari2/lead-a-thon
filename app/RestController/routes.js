const express = require('express')
const router = express.Router()
const services = require('../service/cacheController')
const dao = require('../DAO/dataAccess')

router.get('/',services.isAvailableInCache,dao.getAllData)
router.get('/:CODE',services.isCodeAvailableInCache,dao.getCodeData)

module.exports = router
