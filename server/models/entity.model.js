const mongoose = requre('mongoose');

const entitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dataType: {
        type: String,
        default: "entity"
    },
    status: {
        type: String,
        trim: true
    },
    infoLinks: {
        factions: [String],
        places: [String],
        events: [String],
        items: [String],
        entities: [String],
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

const Entity = mongoose.model('Entity', entitySchema);

module.exports = Entity;