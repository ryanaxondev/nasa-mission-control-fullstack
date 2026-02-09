// models/planets.model

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  const disposition = planet['koi_disposition'];
  const insol = Number(planet['koi_insol']);
  const radius = Number(planet['koi_prad']);
  const equilibriumTemp = Number(planet['koi_teq']);
  const stellarTemp = Number(planet['koi_steff']);

  return (
    disposition === 'CONFIRMED' &&
    insol > 0.36 && insol < 1.11 &&
    radius < 1.6 &&
    equilibriumTemp > 185 && equilibriumTemp < 303 &&
    stellarTemp > 2600 && stellarTemp < 7200
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {

    fs.createReadStream(
      path.join(__dirname, '../../data/kepler-data.csv')
    )
      .pipe(parse({
        comment: '#',
        columns: true,
        trim: true
      }))
      .on('data', (data) => {

        if (isHabitablePlanet(data)) {
          habitablePlanets.push({
            keplerName: data['kepler_name'],
            radius: Number(data['koi_prad']),
            equilibriumTemp: Number(data['koi_teq']),
            stellarTemp: Number(data['koi_steff']),
            insolation: Number(data['koi_insol'])
          });
        }

      })
      .on('error', reject)
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found`);
        resolve();
      });

  });
}

function getAllPlanets() {
  return habitablePlanets;
}

function addNewPlanet(planet) {
  habitablePlanets.push({
    keplerName: planet.name
  });
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
  addNewPlanet,
};
