const express = require('express')
const router = new express.Router()
const {addItem,addNew,getItem,editItem,deleteItem,updateItem} = require('../controllers/item_controller')

router.get('/add',addNew)
router.get('/:id',getItem)
router.get('/:id/edit',editItem)
router.patch('/:id/edit',updateItem)
router.delete('/:id/delete',deleteItem)
router.post('/add',addItem)

module.exports = router