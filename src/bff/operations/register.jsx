import { createUser, getUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin, regPassword) => {
  try {
    let newUser = await getUser(regLogin);
    if (newUser) {
      return { error: 'Такой пользователь уже зарегистрирован', res: null };
    }
    const user = await createUser(regLogin, regPassword);
    //Не добавляем сессию сразу, т.к. между регистрацией и входом в систему могут быть другие действия.
    //Например, подтверждение по почте или капча
    return {
      error: null,
      res: {
        userData: {
          id: user.id,
          login: user.login,
          registeredAt: user.registeredAt,
          roleId: user.roleId,
        },
        session: sessions.add(user),
      },
    };
  } catch (error) {
    return { error: error.message, res: null };
  }
};
