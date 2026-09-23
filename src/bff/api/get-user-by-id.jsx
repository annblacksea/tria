import { transformUser } from '../transformers';

export const getUserById = async (userId) => {
  if (!userId) {
    console.warn('userId:', userId);
    return null;
  }

  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`);

    if (!response.ok) {
      throw new Error('Пользователь с таким ID не найден');
    }

    const loadedUser = await response.json();

    return loadedUser && transformUser(loadedUser);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
