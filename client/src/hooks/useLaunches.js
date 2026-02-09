import { useCallback, useEffect, useRef, useState } from "react";

import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from './requests';

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  const [launches, saveLaunches] = useState([]);
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  const timeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  // Prevent memory leak
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getLaunches = useCallback(async () => {
    try {
      const fetchedLaunches = await httpGetLaunches();
      if (isMountedRef.current) {
        saveLaunches(fetchedLaunches);
      }
    } catch (err) {
      console.error("Failed to fetch launches:", err);
    }
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(async (e) => {
    e.preventDefault();

    // جلوگیری از کلیک چندباره
    if (isPendingLaunch) return;

    setPendingLaunch(true);

    const data = new FormData(e.target);

    const launchDate = new Date(data.get("launch-day"));
    const mission = data.get("mission-name");
    const rocket = data.get("rocket-name");
    const target = data.get("planets-selector");

    try {
      const response = await httpSubmitLaunch({
        launchDate,
        mission,
        rocket,
        target,
      });

      const success = response.ok;

      if (success) {
        await getLaunches();

        timeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            setPendingLaunch(false);
            onSuccessSound();
          }
        }, 800);

      } else {
        setPendingLaunch(false);
        onFailureSound();
      }

    } catch (err) {
      console.error("Submit launch failed:", err);
      setPendingLaunch(false);
      onFailureSound();
    }

  }, [getLaunches, isPendingLaunch, onSuccessSound, onFailureSound]);

  const abortLaunch = useCallback(async (id) => {
    try {
      const response = await httpAbortLaunch(id);

      const success = response.ok;

      if (success) {
        await getLaunches();
        onAbortSound();
      } else {
        onFailureSound();
      }

    } catch (err) {
      console.error("Abort launch failed:", err);
      onFailureSound();
    }

  }, [getLaunches, onAbortSound, onFailureSound]);

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;
