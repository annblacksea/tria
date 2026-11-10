import { getSketches } from '../api';

export const fetchSketches = async () => {
  try {
    const sketches = await getSketches();

    console.log(sketches);

    return {
      error: null,
      res: sketches,
    };
  } catch {}
};
