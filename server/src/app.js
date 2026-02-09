// app.js

const express = require('express');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

const cors = require('cors');

app.use(cors({
  origin: process.env.CLIENT_URL || '*'
}));

app.use(express.json());

app.use('/v1', planetsRouter);

module.exports = app;