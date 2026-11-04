export const transformSketch = (dbSketch) => ({
  id: dbSketch.id,
  authorId: dbSketch.author_id,
  title: dbSketch.title,
  images: dbSketch.images,
  description: dbSketch.description,
  publishedAt: dbSketch.published_at,
});
