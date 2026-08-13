export const getRoles = async () => {
  try {
    const response = await fetch('http://localhost:3000/roles');

    if (!response.ok) {
      throw new Error('Не удалось загрузить список ролей');
    }

    const roles = await response.json();

    return roles;
  } catch (error) {
    console.error('Ошибка в getRoles:', error.message);
    return [];
  }
};
