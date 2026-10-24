import { deleteCommentData } from '../slices/comments-slice';

export const removeCommentAsync = (requestServer, authorId, commentId) => async (dispatch) => {
  try {
    const response = await requestServer('removeComment', authorId, commentId);

    if (response.error || !response.res) {
      return false;
    }

    dispatch(deleteCommentData(commentId));

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
