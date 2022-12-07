const router = require('express').Router();
let Entity = require('../models/entity.model');

// Simple fetching for all data
router.route('/').get( async (req, res) => {
    Entity.find().select({name: 1, dataType: 1, status: 1})
        .then(entities => res.json(entities))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new entry
router.route('/add').post( async (req, res) => {
    const name = req.body.name;
    const dataType = 'entity';
    const status = req.body.status;
    const infoLinks = {
        "factions": [],
        "places": [],
        "events": [],
        "items": [],
        "entities": [],
        "other": []
    };
    const main = req.body.main;

    const newEntity = new Entity({
        name,
        dataType,
        status,
        infoLinks,
        main
    });

    newEntity.save()
        // Return new entry for easy data access
        .then((result) => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Find specific entry
router.route('/:id').get( async (req, res) => {
    Entity.findById(req.params.id)
        .then(entity => res.json(entity))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete specific entry
router.route('/:id').delete( async (req, res) => {
    Entity.findByIdAndDelete(req.params.id)
        .then(() => res.json('Entity deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update specific entry
router.route('/:id/update').post( async (req, res) => {
    Entity.findById(req.params.id)
        .then(entity => {
            // Currently, updates all fields not matter what was changed
            entity.name = req.body.name;
            entity.status = req.body.status;
            entity.infoLinks = req.body.infoLinks;
            entity.main = req.body.main;

            entity.save()
                .then(() => res.json('Entity updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;