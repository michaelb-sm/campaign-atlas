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
const peopleRouter = require('./routes/people');
const factionRouter = require('/routes/factions');
const placeRouter = require('/routes/places');
const eventRouter = require('/routes/events');
const thingRouter = require('/routes/things');
const entityRouter = require('/routes/entities');
const creatureRouter = require('/routes/creatures');

app.use('/people', peopleRouter);
app.use('/faction', factionRouter);
app.use('/place', placeRouter);
app.use('/event', eventRouter);
app.use('/thing', thingRouter);
app.use('/entity', entityRouter);
app.use('/creature', creatureRouter);

// Port Connection
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
