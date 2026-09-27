import { createUser, getUserByLogin } from '../api';
import { authorize } from './authorize';

export const register = async (regLogin, regPassword) => {
  try {
    let newUser = await getUserByLogin(regLogin);
    if (newUser) {
      return { error: 'Такой пользователь уже зарегистрирован', res: null };
    }

    await createUser(regLogin, regPassword);

    return await authorize(regLogin, regPassword);
  } catch (error) {
    return { error: error.message, res: null };
  }
};
