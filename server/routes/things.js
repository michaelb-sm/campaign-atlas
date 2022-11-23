const router = require('express').Router();
let Thing = require('../models/thing.model');

router.route('/').get( (req, res) => {
    Thing.find()
        .then(things => res.json(things))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( (req, res) => {
    const name = req.body.name;
    const status = req.body.status;
    const infoLinks = req.body.infoLinks;
    const main = req.body.main;

    const newThing = new Thing({
        name,
        status,
        infoLinks,
        main
    });

    newThing.save()
        .then(() => res.json('Thing added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( (req, res) => {
    Thing.findById(req.params.id)
        .then(thing => res.json(thing))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( (req, res) => {
    Thing.findByIdAndDelete(req.params.id)
        .then(() => res.json('Thing deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post( (req, res) => {
    Thing.findById(req.params.id)
        .then(thing => {
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