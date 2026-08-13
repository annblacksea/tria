import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorize = async (authLogin, authPassword) => {
  try {
    const user = await getUser(authLogin);

    if (!user) {
      return { error: 'Такой пользователь не зарегистрирован', res: null };
    }
    if (authPassword !== user.password) {
      return { error: 'Пароль не совпадает', res: null };
    }

    const { id, login, registeredAt, roleId } = user;

    return {
      error: null,
      res: {
        userData: {
          id,
          login,
          registeredAt,
          roleId,
        },
        session: sessions.add(user),
      },
    };
  } catch (error) {
    return { error: error.message, res: null };
  }
};
