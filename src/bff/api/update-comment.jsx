export const updateComment = async (commentId, editedText) => {
  try {
    const response = await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ text: editedText }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при изменении комментария');
    }

    const updatedComment = await response.json();
    console.log('Ответ API при изменении комментария: ', updatedComment);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};
