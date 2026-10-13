export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Ошибка при удалении комментария на сервере');
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
