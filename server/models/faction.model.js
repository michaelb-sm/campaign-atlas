const mongoose = requre('mongoose');

const factionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    dataType: {
        type: String,
        default: "faction"
    },
    status: {
        type: String,
        trim: true
    },
    infoLinks: {
        members: [String],
        enemies: [String],
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

const Faction = mongoose.model('Faction', factionSchema);

module.exports = Faction;