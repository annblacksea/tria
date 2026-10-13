export const getUsersByIds = async (userIds = []) => {
  if (!userIds.length) return [];

  try {
    const params = userIds.map((id) => `id=${id}`).join('&');

    const response = await fetch(`http://localhost:3000/users?${params}`);

    if (!response.ok) {
      throw new Error('Не удалось загрузить данные пользователей');
    }

    const users = await response.json();

    return users;
  } catch (error) {
    console.error('Ошибка в getUsersByIds:', error.message);
    return [];
  }
};
