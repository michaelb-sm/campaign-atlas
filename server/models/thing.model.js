const mongoose = require('mongoose');

const thingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    dataType: {
        type: String,
        default: "thing"
    },
    status: {
        type: String,
        trim: true
    },
    infoLinks: {
        people: [String],
        factions: [String],
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

const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;