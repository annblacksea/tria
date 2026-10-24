import { updateCommentData } from '../slices/comments-slice';

export const updateCommentAsync = (requestServer, authorId, commentId, text) => async (dispatch) => {
  try {
    const response = await requestServer('saveCommentUpdates', authorId, commentId, text);

    if (response.error || !response.res) {
      return false;
    }

    dispatch(updateCommentData({ id: commentId, text }));

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
