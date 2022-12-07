const router = require('express').Router();
let Person = require('../models/person.model');

router.route('/').get( async (req, res) => {
    Person.find().select({name: 1, dataType: 1, status: 1})
        .then(people => res.json(people))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( async (req, res) => {
    const name = req.body.name;
    const dataType = 'person';
    const status = req.body.status;
    const infoLinks = {
        "allies": [],
        "enemies": [],
        "places": [],
        "events": [],
        "items": [],
        "other": []
    };
    const main = req.body.main;

    const newPerson = new Person({
        name,
        dataType,
        status,
        infoLinks,
        main
    });

    newPerson.save()
        .then((result) => res.json(result))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( async (req, res) => {
    Person.findById(req.params.id)
        .then(person => res.json(person))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( async (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => res.json('Person deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/update').post( async (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            person.name = req.body.name;
            person.status = req.body.status;
            person.infoLinks = req.body.infoLinks;
            person.main = req.body.main;

            person.save()
                .then(() => res.json('Person updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;