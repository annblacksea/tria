import { getSketches } from '../api';

export const fetchSketches = async (page, limit, searchPhrase) => {
  try {
    const [sketches, links] = await getSketches(page, limit, searchPhrase);

    return {
      error: null,
      res: { sketches, links },
    };
  } catch {}
};
