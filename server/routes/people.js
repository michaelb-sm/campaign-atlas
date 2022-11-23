const router = require('express').Router();
let Person = require('../models/person.model');

router.route('/').get( (req, res) => {
    Person.find()
        .then(people => res.json(people))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post( (req, res) => {
    const name = req.body.name;
    const status = req.body.status;
    const infoLinks = req.body.infoLinks;
    const main = req.body.main;

    const newPerson = new Person({
        name,
        status,
        infoLinks,
        main
    });

    newPerson.save()
        .then(() => res.json('Person added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( (req, res) => {
    Person.findById(req.params.id)
        .then(person => res.json(person))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( (req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => res.json('Person deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post( (req, res) => {
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