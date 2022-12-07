// Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Setup
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Mongoose Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
});

// Routing
const peopleRouter = require('./routes/people.route');
const factionRouter = require('./routes/factions.route');
const placeRouter = require('./routes/places.route');
const eventRouter = require('./routes/events.route');
const thingRouter = require('./routes/things.route');
const entityRouter = require('./routes/entities.route');
const creatureRouter = require('./routes/creatures.route');

app.use('/people', peopleRouter);
app.use('/factions', factionRouter);
app.use('/places', placeRouter);
app.use('/events', eventRouter);
app.use('/things', thingRouter);
app.use('/entities', entityRouter);
app.use('/creatures', creatureRouter);

app.use('*', (req, res) => res.status(404).json({error: "Not Found"}));

// Local Port Connection
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
