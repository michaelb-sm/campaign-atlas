const router = require('express').Router();
let Place = require('../models/place.model');

// Simple fetching for all data
router.route('/').get( async (req, res) => {
    Place.find().select({name: 1, dataType: 1, status: 1})
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new entry
router.route('/add').post( async (req, res) => {
    const name = req.body.name;
    const dataType = 'place';
    const status = req.body.status;
    const infoLinks = {
        "people": [],
        "places": [],
        "events": [],
        "other": []
    };
    const main = req.body.main;

    const newPlace = new Place({
        name,
        dataType,
        status,
        infoLinks,
        main
    });

    newPlace.save()
        // Return new entry for easy data access
        .then((result) => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Find specific entry
router.route('/:id').get( async (req, res) => {
    Place.findById(req.params.id)
        .then(place => res.json(place))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete specific entry
router.route('/:id').delete( async (req, res) => {
    Place.findByIdAndDelete(req.params.id)
        .then(() => res.json('Place deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update specific entry
router.route('/:id/update').post( async (req, res) => {
    Place.findById(req.params.id)
        .then(place => {
            // Currently, updates all fields not matter what was changed
            place.name = req.body.name;
            place.status = req.body.status;
            place.infoLinks = req.body.infoLinks;
            place.main = req.body.main;

            place.save()
                .then(() => res.json('Place updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;