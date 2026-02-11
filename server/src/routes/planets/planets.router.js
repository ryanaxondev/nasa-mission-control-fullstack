const express = require('express');

const {
  httpGetAllPlanets,
  httpAddNewPlanet,
} = require('./planets.controller');

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets);
planetsRouter.post('/', httpAddNewPlanet);

module.exports = planetsRouter;
