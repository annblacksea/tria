export const transformSketch = (dbSketch) => ({
  id: dbSketch.id,
  author: dbSketch.author,
  title: dbSketch.title,
  images: dbSketch.images,
  description: dbSketch.description,
  publishedAt: dbSketch.published_at,
});
