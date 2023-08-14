const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    pc: {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    },
    monitor: {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    },
    ram:  {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    },
    hard:  {
        type: Schema.Types.ObjectId,
        ref: 'Storage'
    },
}, { timestamps: true, versionKey: false })

const Storage = mongoose.model('Storage', schema)
module.exports = Storage