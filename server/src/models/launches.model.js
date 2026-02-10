const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launcheDate : new Date('December 27, 2030'),
    destination : 'Kepler-442 b',
    customer : ['AXON', 'NASA'],
    upcoming : true,
    success : true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
    launches,
};