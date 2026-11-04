import { deleteComment, deleteSketch, getComments } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removeSketch = async (session, ownerId, sketchId) => {
  const accessRoles = [ROLE.ADMIN];

  if (!(await sessions.access(session, accessRoles, ownerId))) {
    return { res: null, error: 'Доступ к функции удаления этюда запрещен' };
  }

  const isSketchDeleted = await deleteSketch(sketchId);

  if (!isSketchDeleted) {
    return { res: null, error: 'Не удалось удалить этюд' };
  }

  const comments = await getComments(sketchId);
  await comments.forEach((comment) => deleteComment(comment.id));

  return { res: true, error: null };
};
