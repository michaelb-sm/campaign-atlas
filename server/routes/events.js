const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get( (req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( (req, res) => {
    const name = req.body.name;
    const status = req.body.status;
    const infoLinks = req.body.infoLinks;
    const main = req.body.main;

    const newEvent = new Event({
        name,
        status,
        infoLinks,
        main
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( (req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( (req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post( (req, res) => {
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