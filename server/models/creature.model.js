const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dataType: {
        type: String,
        default: "creature"
    },
    status: {
        type: String,
        trim: true
    },
    infoLinks: {
        people: [String],
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
            body: String
        }
    ]
});

const Creature = mongoose.model('Creature', creatureSchema);

module.exports = Creature;