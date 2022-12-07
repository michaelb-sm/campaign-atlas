const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get( async (req, res) => {
    Event.find().select({name: 1, dataType: 1, status: 1})
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

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
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( async (req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( async (req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').post( async (req, res) => {
    Event.findById(req.params.id)
        .then(event => {
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