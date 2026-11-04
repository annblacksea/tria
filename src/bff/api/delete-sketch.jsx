export const deleteSketch = async (sketchId) => {
  try {
    const response = await fetch(`http://localhost:3000/sketch/${sketchId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Ошибка при удалении этюда на сервере');
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
