import { transformUser } from '../transformers';

export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/users');

    if (!response.ok) {
      throw new Error('Не удалось загрузить список пользователей');
    }

    const users = await response.json();

    return users && users.map((user) => transformUser(user));
  } catch (error) {
    console.error('Ошибка в getUsers:', error.message);
    return [];
  }
};
