const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
    type: {
        type: String,
        required: true
    },
    serialNo: {
        type: String,
        required: true
    },
    volume:  {
        type: String,
        required: true
    },

}, { timestamps: true, versionKey: false })

const Storage = mongoose.model('Storage', schema)
module.exports = Storage