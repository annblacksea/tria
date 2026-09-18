import { transformComment } from '../transformers';

export const getComments = async (sketchId) => {
  try {
    const response = await fetch(`http://localhost:3000/comments?sketch_id=${sketchId}`);

    if (!response.ok) {
      throw new Error('Не удалось загрузить список коментариев');
    }

    const comments = await response.json();

    return comments && comments.map((comment) => transformComment(comment));
  } catch (error) {
    console.error('Ошибка в getComments:', error.message);
    throw error;
  }
};
