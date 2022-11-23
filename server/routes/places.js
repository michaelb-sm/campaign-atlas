const router = require('express').Router();
let Place = require('../models/place.model');

router.route('/').get( (req, res) => {
    Place.find()
        .then(places => res.json(places))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( (req, res) => {
    const name = req.body.name;
    const status = req.body.status;
    const infoLinks = req.body.infoLinks;
    const main = req.body.main;

    const newPlace = new Place({
        name,
        status,
        infoLinks,
        main
    });

    newPlace.save()
        .then(() => res.json('Place added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( (req, res) => {
    Place.findById(req.params.id)
        .then(place => res.json(place))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( (req, res) => {
    Place.findByIdAndDelete(req.params.id)
        .then(() => res.json('Place deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post( (req, res) => {
    Place.findById(req.params.id)
        .then(place => {
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