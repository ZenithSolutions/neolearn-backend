const mongoose = require('mongoose')
require('dot-env').config

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const initialize = async () => {
    //local connection
    const connectionString = `mongodb://localhost:27017/Users`

    //cloud connection
    const cloudConnectionString = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@zeddnext.5yops.mongodb.net/NeoLearn?retryWrites=true&w=majority`
    console.log(cloudConnectionString)
    mongoose.set('debug', true)
    mongoose.connect(cloudConnectionString, options)

    const db = mongoose.connection
    db.on('error', err => console.error(err))
    db.once('open', () => console.log('DB available'))
}

module.exports = initialize