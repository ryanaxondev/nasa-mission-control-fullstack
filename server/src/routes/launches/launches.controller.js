const {
  getAllLaunches,
  getLaunchById,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  const launchDate = new Date(launch.launchDate);

  if (isNaN(launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  launch.launchDate = launchDate;

  addNewLaunch(launch);

  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {

  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'Launch not found!',
    });
  }

  const success = abortLaunchById(launchId);

  if (!success) {
    return res.status(500).json({
      error: 'Failed to abort launch',
    });
  }

  // fetch updated launch
  const abortedLaunch = getLaunchById(launchId);

  return res.status(200).json(abortedLaunch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
