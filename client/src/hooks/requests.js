const API_URL = process.env.REACT_APP_API_URL;

// Helper function for handling fetch safely
async function safeFetch(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
      };
    }

    return response;
  } catch (err) {
    console.error("Network error:", err);
    return {
      ok: false,
    };
  }
}

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await safeFetch(`${API_URL}/planets`);

  if (!response.ok) {
    return [];
  }

  try {
    return await response.json();
  } catch {
    return [];
  }
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await safeFetch(`${API_URL}/launches`);

  if (!response.ok) {
    return [];
  }

  try {
    const fetchedLaunches = await response.json();
    return fetchedLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber;
    });
  } catch {
    return [];
  }
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  return await safeFetch(`${API_URL}/launches`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(launch),
  });
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  return await safeFetch(`${API_URL}/launches/${id}`, {
    method: "delete",
  });
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
