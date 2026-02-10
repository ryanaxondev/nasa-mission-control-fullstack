const path = require('path');
const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');
// const launchesRouter = require('./routes/launches/launches.router');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || '*',
}));

app.use(express.json());

// ---------- Serve Frontend ----------
app.use(express.static(path.join(__dirname, '../public')));

// ---------- API Routes ----------
app.use('/v1', planetsRouter);
// app.use('/v1', launchesRouter);

// ---------- React SPA Fallback ----------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
