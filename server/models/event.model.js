const mongoose = requre('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dataType: {
        type: String,
        default: "event"
    },
    status: {
        type: String,
        trim: true
    },
    infoLinks: {
        people: [String],
        factions: [String],
        places: [String],
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

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;