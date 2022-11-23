const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dataType: {
        type: String,
        default: "person"
    },
    status: {
        type: String,
        trim: true
    },
    infoLinks: {
        allies: [String],
        enemies: [String],
        places: [String],
        events: [String],
        items: [String],
        other: [String]
    },
    main: [
        {
            heading: {
                type: String,
                trim: true
            },
            body: {
                type: String,
                trim: true
            }
        }
    ]
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;