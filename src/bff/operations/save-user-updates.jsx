import { updateUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const saveUserUpdates = async (session, id, data) => {
  const accessRoles = [ROLE.ADMIN];
  if (!sessions.access(session, accessRoles)) {
    return { res: null, error: 'Доступ к функции смены данных пользователя запрещен' };
  }

  try {
    const saveUpdates = await updateUser(id, data);

    if (!saveUpdates) {
      return { error: 'Не удалось обновить данные пользователя', res: null };
    }
    return { error: null, res: true };
  } catch (error) {
    console.error(error);
    return { res: null, error: 'Ошибка на сервере' };
  }
};
