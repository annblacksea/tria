import { getSketches } from '../api';

export const fetchSketches = async (page, limit) => {
  try {
    const [sketches, links] = await getSketches(page, limit);

    return {
      error: null,
      res: { sketches, links },
    };
  } catch {}
};
