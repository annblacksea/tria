import { addComment } from '../slices/comments-slice';

export const addNewCommentAsync = (requestServer, sketchId, text) => async (dispatch) => {
  try {
    const response = await requestServer('addNewComment', sketchId, text);

    if (response.error) {
      throw new Error('Ошибка в thunk');
    }
    dispatch(addComment(response.res));

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
