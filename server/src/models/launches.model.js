const launches = new Map();

let latestFlightNumber = 100;

const initialLaunch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['AXON', 'NASA'],
  upcoming: true,
  success: true,
};

function loadInitialData() {
  launches.clear();
  launches.set(initialLaunch.flightNumber, { ...initialLaunch });
  latestFlightNumber = 100;
}

loadInitialData();

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getLaunchById(launchId) {
  return launches.get(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;

  const newLaunch = {
    ...launch,
    flightNumber: latestFlightNumber,
    customers: ['AXON', 'NASA'],
    upcoming: true,
    success: true,
  };

  launches.set(latestFlightNumber, newLaunch);

  return newLaunch;
}

function abortLaunchById(launchId) {
  const existingLaunch = launches.get(launchId);

  if (!existingLaunch) {
    return false;
  }

  const abortedLaunch = {
    ...existingLaunch,
    upcoming: false,
    success: false,
  };

  launches.set(launchId, abortedLaunch);

  return true;
}

function resetLaunches() {
  loadInitialData();
}

module.exports = {
  existsLaunchWithId,
  getLaunchById,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  resetLaunches,
};