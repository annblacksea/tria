import { transformSketch } from '../transformers';
import { generateDate } from '../utils';

export const createSketch = async (authorId, title, images = [], description) => {
  try {
    const response = await fetch('http://localhost:3000/sketch', {
      method: 'POST',
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        author_id: authorId,
        title,
        images,
        description,
        published_at: generateDate(),
      }),
    });
    if (!response.ok) {
      throw new Error('Ошибка создания этюда');
    }

    const createdSketch = await response.json();

    return transformSketch(createdSketch); //возврат информации о sketch с уже правильными полями
  } catch {
    console.error(error.message);
    return null;
  }
};
