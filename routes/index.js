const express = require('express')
const router = new express.Router()
const {getItems} = require('../controllers/item_controller')

router.get('/',getItems)

module.exports = router