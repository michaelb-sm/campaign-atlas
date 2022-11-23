const mongoose = requre('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dataType: {
        type: String,
        default: "place"
    },
    status: {
        type: String,
        trim: true
    },
    infoLinks: {
        people: [String],
        places: [String],
        events: [String],
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

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;