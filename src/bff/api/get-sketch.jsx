import { transformSketch } from '../transformers/transform-sketch';

export const getSketch = async (sketchIdToFind) => {
  try {
    const response = await fetch(`http://localhost:3000/sketch?id=${sketchIdToFind}`);

    if (!response.ok) {
      throw new Error('Ошибка при запросе к базе данных');
    }

    const loadedSketch = await response.json();

    const [sketch] = loadedSketch;

    if (!sketch) {
      throw new Error('Такого этюда не существует');
    }

    const transformedSketch = sketch && transformSketch(sketch);

    return transformedSketch;
  } catch (error) {
    throw error;
  }
};
