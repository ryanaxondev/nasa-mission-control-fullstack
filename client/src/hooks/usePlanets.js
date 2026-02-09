import { useCallback, useEffect, useRef, useState } from "react";
import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, savePlanets] = useState([]);
  const isMountedRef = useRef(true);

  // cleanup to prevent memory leak
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const getPlanets = useCallback(async () => {
    try {
      const fetchedPlanets = await httpGetPlanets();
      if (isMountedRef.current) {
        savePlanets(fetchedPlanets);
      }
    } catch (err) {
      console.error("Failed to fetch planets:", err);
      if (isMountedRef.current) {
        savePlanets([]); // fallback safe
      }
    }
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
