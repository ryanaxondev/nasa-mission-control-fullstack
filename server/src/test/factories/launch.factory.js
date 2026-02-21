function createLaunch(overrides = {}) {
  return {
    mission: 'USS Enterprise',
    rocket: 'NCC 170-D',
    target: 'Kepler-186 f',
    launchDate: 'January 4, 2028',
    ...overrides,
  };
}

module.exports = {
  createLaunch,
};