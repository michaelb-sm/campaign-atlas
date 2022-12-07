const router = require('express').Router();
let Thing = require('../models/thing.model');

// Simple fetching for all data
router.route('/').get( async (req, res) => {
    Thing.find().select({name: 1, dataType: 1, status: 1})
        .then(things => res.json(things))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new entry
router.route('/add').post( async (req, res) => {
    const name = req.body.name;
    const dataType = 'thing';
    const status = req.body.status;
    const infoLinks = {
        "people": [],
        "factions": [],
        "places": [],
        "events": [],
        "items": [],
        "other": []
    };
    const main = req.body.main;

    const newThing = new Thing({
        name,
        dataType,
        status,
        infoLinks,
        main
    });

    newThing.save()
        // Return new entry for easy data access
        .then((result) => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Find specific entry
router.route('/:id').get( async (req, res) => {
    Thing.findById(req.params.id)
        .then(thing => res.json(thing))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete specific entry
router.route('/:id').delete( async (req, res) => {
    Thing.findByIdAndDelete(req.params.id)
        .then(() => res.json('Thing deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update specific entry
router.route('/:id/update').post( async (req, res) => {
    Thing.findById(req.params.id)
        .then(thing => {
            // Currently, updates all fields not matter what was changed
            thing.name = req.body.name;
            thing.status = req.body.status;
            thing.infoLinks = req.body.infoLinks;
            thing.main = req.body.main;

            thing.save()
                .then(() => res.json('Thing updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;