import { getComments, getUsersByIds } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const fetchComments = async (session, sketchId) => {
  const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER];

  if (!(await sessions.access(session, accessRoles))) {
    return { res: null, error: 'Доступ запрещен' };
  }

  try {
    const commentsList = await getComments(sketchId);
    console.log('2. Список из getComments:', commentsList);
    if (!commentsList) {
      return { res: [], error: null };
    }

    const userIds = [...new Set(commentsList.map((comment) => comment.userId))];
    console.log('3. Массив userIds:', userIds);
    const users = await getUsersByIds(userIds);
    console.log('4. Список пользователей из getUsersByIds:', users);

    const preparedComments = commentsList.map((comment) => {
      const author = users.find((user) => user.id === comment.userId);
      return { ...comment, authorLogin: author.login };
    });

    return { res: preparedComments, error: null };
  } catch (error) {
    return { error: error.message, res: null };
  }
};
