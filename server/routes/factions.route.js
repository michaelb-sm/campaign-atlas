const router = require('express').Router();
let Faction = require('../models/faction.model');

router.route('/').get( async (req, res) => {
    Faction.find().select({name: 1, dataType: 1, status: 1})
        .then(factions => res.json(factions))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( async (req, res) => {
    const name = req.body.name;
    const dataType = 'faction';
    const status = req.body.status;
    const infoLinks = {
        "members": [],
        "enemies": [],
        "people": [],
        "places": [],
        "events": [],
        "other": []
    };
    const main = req.body.main;

    const newFaction = new Faction({
        name,
        dataType,
        status,
        infoLinks,
        main
    });

    newFaction.save()
        .then(() => res.json('Faction added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( async (req, res) => {
    Faction.findById(req.params.id)
        .then(faction => res.json(faction))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( async (req, res) => {
    Faction.findByIdAndDelete(req.params.id)
        .then(() => res.json('Faction deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').post( async (req, res) => {
    Faction.findById(req.params.id)
        .then(faction => {
            faction.name = req.body.name;
            faction.status = req.body.status;
            faction.infoLinks = req.body.infoLinks;
            faction.main = req.body.main;

            faction.save()
                .then(() => res.json('Faction updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;