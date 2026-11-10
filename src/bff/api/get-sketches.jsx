import { transformSketch } from '../transformers';

export const getSketches = async () => {
  try {
    const response = await fetch('http://localhost:3000/sketch');

    if (!response.ok) {
      throw new Error('Не удалось загрузить список sketches');
    }

    const sketches = await response.json();

    return sketches && sketches.map((sketch) => transformSketch(sketch));
  } catch (error) {
    console.error('Ошибка в getSketches:', error.message);
    return [];
  }
};
