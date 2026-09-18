export const transformComment = (dbComment) => ({
  id: dbComment.id,
  sketchId: dbComment.sketch_id,
  userId: dbComment.user_id,
  text: dbComment.text,
  createdAt: dbComment.created_at,
});
