const Item = require('../models/item')
const { IncomingForm } = require('formidable')
const fs = require('fs')
const moment = require('moment')

moment.locale('ar')

const itemList = ['pc', 'laptop', 'printer', 'scanner', 'monitor', 'keyboard', 'mouse']

const getItems = async (req, res) => {
    const limit = 10
    const page = req.query.page || 1
    console.log(page);
    const { q } = req.query || '';
    const query = q && q !== '' ? {
        $or: [
            {
                name: {
                    $regex: q,
                    $options: 'is'
                }
            },
            {
                model: {
                    $regex: q,
                    $options: 'is'
                }
            },
            {
                type: {
                    $regex: q,
                    $options: 'is'
                }
            },
            {
                serialNo: {
                    $regex: q,
                    $options: 'is'
                }
            },
        ]
    } : {}

    const items = await Item.find(query).sort({ createdAt: 'desc' }).limit(limit).skip(limit * (page - 1))
    const count = q && q !== '' ? await Item.find(query).countDocuments() : await Item.countDocuments()
    const pagesCount = Math.ceil(count / limit)
    res.render('index', { items, limit, page, count, pagesCount, q, moment })
}

const getItem = async (req, res) => {
    const { id } = req.params
    const item = await Item.findById(id)
    res.render('items/show', { item, moment })
}

const addNew = (req, res) => {
    res.render('items/add', { itemList })
}

const addItem = async (req, res) => {
    const body = req.body
    const item = new Item(body)
    await item.save()
    // const form = new IncomingForm()
    // form.parse(req, async (err, fields, files) => {
    //     console.log('error:',err)
    //     console.log(fields)
    //     const body = fields
    //     const item = new item(body)
    //     await item.save()
    // })
    res.redirect('/')
}
const editItem = async (req, res) => {
    const { id } = req.params
    const item = await Item.findById(id)
    res.render('items/edit', { itemList, item, moment })
}

const updateItem = async (req, res) => {
    const { id } = req.params
    const body = req.body
    await Item.findByIdAndUpdate(id, body)
    res.redirect(`/items/${id}`)
}
const deleteItem = async (req, res) => {
    const { id } = req.params
    const body = req.body
    await Item.findByIdAndDelete(id)
    res.redirect('/')
}

module.exports = {
    getItems, getItem, addItem, addNew, editItem, updateItem, deleteItem
}