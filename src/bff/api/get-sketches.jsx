import { transformSketch } from '../transformers';

export const getSketches = async (page, limit) => {
  try {
    const response = await fetch(`http://localhost:3000/sketch?_page=${page}&_limit=${limit}`);

    if (!response.ok) {
      throw new Error('Не удалось загрузить список sketches');
    }

    const loadedSketches = await response.json();
    const sketches = loadedSketches.map((sketch) => transformSketch(sketch));

    const links = await response.headers.get('link');
    console.log(links);

    return sketches;
  } catch (error) {
    console.error('Ошибка в getSketches:', error.message);
    return [];
  }
};
