import { transformSketch } from '../transformers';

export const updateSketch = async (sketchId, sketchData) => {
  try {
    const response = await fetch(`http://localhost:3000/sketch/${sketchId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ title: sketchData.title, description: sketchData.description }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при изменении этюда');
    }

    const updatedSketch = await response.json();
    console.log('Ответ API при изменении этюда: ', updatedSketch);
    return updatedSketch && transformSketch(updatedSketch);
  } catch (error) {
    console.error(error.message);
    return false;
  }
};
