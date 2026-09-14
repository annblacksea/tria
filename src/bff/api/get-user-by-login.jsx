import { transformUser } from '../transformers';

export const getUserByLogin = async (loginToFind) => {
  try {
    const response = await fetch(`http://localhost:3000/users?login=${loginToFind}`);

    if (!response.ok) {
      throw new Error('Пользователь с таким логином не найден');
    }

    const loadedUser = await response.json();

    const [user] = loadedUser;

    return user && transformUser(user);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
