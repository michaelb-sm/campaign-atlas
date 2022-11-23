const router = require('express').Router();
let Entity = require('../models/entity.model');

router.route('/').get( (req, res) => {
    Entity.find()
        .then(entities => res.json(entities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( (req, res) => {
    const name = req.body.name;
    const status = req.body.status;
    const infoLinks = req.body.infoLinks;
    const main = req.body.main;

    const newEntity = new Entity({
        name,
        status,
        infoLinks,
        main
    });

    newEntity.save()
        .then(() => res.json('Entity added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( (req, res) => {
    Entity.findById(req.params.id)
        .then(entity => res.json(entity))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( (req, res) => {
    Entity.findByIdAndDelete(req.params.id)
        .then(() => res.json('Entity deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post( (req, res) => {
    Entity.findById(req.params.id)
        .then(entity => {
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