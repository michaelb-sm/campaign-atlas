const router = require('express').Router();
let Creature = require('../models/creature.model');

// Simple fetching for all data
router.route('/').get( async (req, res) => {
    Creature.find().select({name: 1, dataType: 1, status: 1})
        .then(creatures => res.json(creatures))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add new entry
router.route('/add').post( async (req, res) => {
    const name = req.body.name;
    const dataType = 'creature';
    const status = req.body.status;
    const infoLinks = {
        "people": [],
        "places": [],
        "events": [],
        "items": [],
        "other": []
    };
    const main = req.body.main;

    const newCreature = new Creature({
        name,
        dataType,
        status,
        infoLinks,
        main
    });

    newCreature.save()
        // Return new entry for easy data access
        .then((result) => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Find specific entry
router.route('/:id').get( async (req, res) => {
    Creature.findById(req.params.id)
        .then(creature => res.json(creature))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete specific entry
router.route('/:id').delete( async (req, res) => {
    Creature.findByIdAndDelete(req.params.id)
        .then(() => res.json('Creature deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update specific entry
router.route('/:id/update').post( async (req, res) => {
    Creature.findById(req.params.id)
        .then(creature => {
            // Currently, updates all fields not matter what was changed
            creature.name = req.body.name;
            creature.status = req.body.status;
            creature.infoLinks = req.body.infoLinks;
            creature.main = req.body.main;

            creature.save()
                .then(() => res.json('Creature updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;