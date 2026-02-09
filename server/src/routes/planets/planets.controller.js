// routes/planets/planets.controller

const { 
  getAllPlanets,
  addNewPlanet: addNewPlanetModel
} = require('../../models/planets.model');


// Mapping Model → API Response
function getAllPlanetsHandler(req, res) {

  const planets = getAllPlanets().map(({ keplerName, ...rest }) => ({
  name: keplerName,
  ...rest
}));

  return res.status(200).json(planets);
}


function addNewPlanet(req, res) {

  const planet = req.body;

  // Validation
  if (!planet.name) {
    return res.status(400).json({
      error: 'Planet name is required'
    });
  }

  if (typeof planet.name !== 'string') {
    return res.status(400).json({
      error: 'Planet name must be a string'
    });
  }

  addNewPlanetModel(planet);

  return res.status(201).json(planet);
}

module.exports = {
  getAllPlanets: getAllPlanetsHandler,
  addNewPlanet,
};
