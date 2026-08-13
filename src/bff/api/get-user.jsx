import { transformUser } from '../transformers';

export const getUser = async (loginToFind) => {
  try {
    const response = await fetch(`http://localhost:3000/users?login=${loginToFind}`);

    if (!response.ok) {
      throw new Error('Ошибка при запросе к базе данных');
    }

    const loadedUser = await response.json();

    const [user] = loadedUser;

    return user && transformUser(user);
  } catch (error) {
    console.error(error.message);
    return error;
  }
};
