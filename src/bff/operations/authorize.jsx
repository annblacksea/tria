import { getUserByLogin } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
  try {
    const user = await getUserByLogin(authLogin);

    if (!user) {
      return { error: 'Такой пользователь не зарегистрирован', res: null };
    }
    if (authPassword !== user.password) {
      return { error: 'Пароль не совпадает', res: null };
    }

    const { id, login, registeredAt, roleId } = user;

    const sessionHash = await sessions.create(user);

    return {
      error: null,
      res: {
        userData: {
          id,
          login,
          registeredAt,
          roleId,
        },
        session: sessionHash,
      },
    };
  } catch (error) {
    return { error: error.message, res: null };
  }
};
