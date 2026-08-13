import { getRoles } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const fetchRoles = async (session) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

  if (!sessions.access(session, accessRoles)) {
    return { res: null, error: 'Доступ запрещен' };
  }

  try {
    const rolesList = await getRoles();
    return {
      error: null,
      res: rolesList,
    };
  } catch (error) {
    return { error: 'Ошибка вызова списка ролей', res: null };
  }
};
