import { deleteUser } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeUser = async (session, id) => {
  const accessRoles = [ROLE.ADMIN];

  if (!sessions.access(session, accessRoles)) {
    return { res: null, error: 'Вы не можете удалить пользователя' };
  }

  const isUserDeleted = await deleteUser(id);

  if (!isUserDeleted) {
    return { res: null, error: 'Не удалось удалить пользователя' };
  }

  return { res: true, error: null };
};
