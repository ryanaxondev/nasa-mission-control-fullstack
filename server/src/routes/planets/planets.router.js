// routes/planets/planets.router

const express = require('express');

const {
  getAllPlanets,
  addNewPlanet
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets);

planetsRouter.post('/planets', addNewPlanet);

module.exports = planetsRouter;