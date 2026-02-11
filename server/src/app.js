const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

// ---------- CORS ----------
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
}));

// ---------- Logging ----------
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// ---------- Body Parser ----------
app.use(express.json());

// ---------- Serve Frontend ----------
app.use(express.static(path.join(__dirname, '../public')));

// ---------- API Routes ----------
app.use('/v1/planets', planetsRouter);
app.use('/v1/launches', launchesRouter);

// ---------- React SPA Fallback ----------
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
