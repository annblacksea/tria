import { getUserById } from '../api';
import { getSketch } from '../api/get-sketch';

export const fetchSketch = async (id) => {
  try {
    const sketch = await getSketch(id);

    const user = await getUserById(sketch.authorId);
    const preparedSketch = { ...sketch, authorLogin: user.login };

    return {
      error: null,
      res: preparedSketch,
    };
  } catch (error) {
    return { error: error.message, res: null };
  }
};
