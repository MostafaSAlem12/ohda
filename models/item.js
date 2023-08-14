const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    serialNo: {
        type: String,
        required: true
    },
    image: String

}, { timestamps: true, versionKey: false })

const Item = mongoose.model('Item', schema)
module.exports = Item