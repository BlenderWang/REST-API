const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

// Getting all
router.get('/', async (req, res) => {
    // code for getting all info
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }catch {
        res.status(500).json({ message: err.message })
    }
})

// Getting One
router.get('/:id', getSubscriber, (req, res) => {
    // :id is a param therefore need to use req.params.id
    res.json(res.subscriber)
})

// Creating one
router.post('/', async (req, res) => {
    // post will be created in the general route
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    // using patch instead of put because it's gonna update only the info subscribers provid eg name/age/desc/etc.
    if(req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    // to delete route
    try {
        await res.subscriber.remove()
        res.json({ message: 'Subscriber deleted.' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    }catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber
    next()
}

module.exports = router