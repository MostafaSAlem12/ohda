const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { config } = require('dotenv')
const methodOverride = require('method-override')
const path = require('path')
const index = require('./routes/index')
const items = require('./routes/items')
const bodyParser = require('body-parser')
const cors = require('cors')
config()


mongoose.connect('mongodb://127.0.0.1:27017/ohda').then(() => {
    console.log('DB connected');
    const port = process.env.PORT || 3000
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(methodOverride('_method'))
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))
    app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")))
    app.use(express.static(path.join(__dirname, "node_modules/bootstrap-icons/font")))
    app.use('/public', express.static(path.join(__dirname, '/public')))
    app.use('/public/uploads', express.static(path.join(__dirname, '/public/uploads')))
    app.use('/', index)
    app.use('/items', items)
    app.listen(port, () => {
        console.log('Server running on port:', port);
    })

}).catch(err => {
    console.log('DB failed to connect', err);
})