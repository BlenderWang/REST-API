const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    // a javascript obj that has all the keys to different properties of the subscribers
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscribeDate : {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)