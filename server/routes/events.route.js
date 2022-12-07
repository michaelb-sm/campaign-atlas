const router = require('express').Router();
let Event = require('../models/event.model');

// Simple fetching for all data
router.route('/').get( async (req, res) => {
    Event.find().select({name: 1, dataType: 1, status: 1})
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new entry
router.route('/add').post( async (req, res) => {
    const name = req.body.name;
    const dataType = 'event';
    const status = req.body.status;
    const infoLinks = {
        "people": [],
        "factions": [],
        "places": [],
        "items": [],
        "other": []
    };
    const main = req.body.main;

    const newEvent = new Event({
        name,
        dataType,
        status,
        infoLinks,
        main
    });

    newEvent.save()
        // Return new entry for easy data access
        .then((result) => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Find specific entry
router.route('/:id').get( async (req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete specific entry
router.route('/:id').delete( async (req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update specific entry
router.route('/:id/update').post( async (req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            // Currently, updates all fields not matter what was changed
            event.name = req.body.name;
            event.status = req.body.status;
            event.infoLinks = req.body.infoLinks;
            event.main = req.body.main;

            event.save()
                .then(() => res.json('Event updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;