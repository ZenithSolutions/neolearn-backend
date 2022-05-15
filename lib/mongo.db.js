const mongoose = require('mongoose')

const options = {
    ssl: false,
    sslValidate: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const initialize = () => {
    const connectionString = `mongodb://localhost:27017/Users`

    mongoose.set('debug', true)
    mongoose.connect(connectionString,options)

    const db = mongoose.connection
    db.on('error', err => console.error(err))
    db.once('open', () => console.log('DB available'))
}

module.exports = initialize