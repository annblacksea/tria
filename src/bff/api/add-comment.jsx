import { generateDate } from '../utils';

export const addComment = async (userId, sketchtId, text) => {
  try {
    const response = await fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        sketch_id: sketchtId,
        user_id: userId,
        text,
        created_at: generateDate(),
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке комментария на сервер');
    }

    const newComment = response.json();

    return newComment;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};
