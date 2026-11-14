import { getSketches } from '../api';

export const fetchSketches = async (page, limit) => {
  try {
    const sketches = await getSketches(page, limit);

    console.log(sketches);

    return {
      error: null,
      res: sketches,
    };
  } catch {}
};
