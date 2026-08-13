import { getUsers } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const fetchUsers = async (session) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  if (!sessions.access(session, accessRoles)) {
    return { res: null, error: 'Доступ запрещен' };
  }

  try {
    const users = await getUsers();
    return {
      error: null,
      res: users,
    };
  } catch (error) {
    return { error: 'Ошибка вызова списка пользователей', res: null };
  }
};
