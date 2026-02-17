const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['AXON', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

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

  launches.set(
    latestFlightNumber,
    {
      ...launch,
      flightNumber: latestFlightNumber,
      customers: ['AXON', 'NASA'],
      upcoming: true,
      success: true,
    }
  );
}

/**
 * Abort launch using immutable update
 * Returns boolean indicating success
 */
function abortLaunchById(launchId) {

  const existingLaunch = launches.get(launchId);

  // Improvement 1: Safe guard
  if (!existingLaunch) {
    return false;
  }

  // Improvement 2: Immutable update
  const abortedLaunch = {
    ...existingLaunch,
    upcoming: false,
    success: false,
  };

  launches.set(launchId, abortedLaunch);

  // Improvement 3: Return boolean
  return true;
}

module.exports = {
  existsLaunchWithId,
  getLaunchById,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
