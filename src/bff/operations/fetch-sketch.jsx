import { getSketch } from '../api/get-sketch';

export const fetchSketch = async (id) => {
  try {
    const sketch = await getSketch(id);

    return {
      error: null,
      res: sketch,
    };
  } catch (error) {
    return { error: error.message, res: null };
  }
};
