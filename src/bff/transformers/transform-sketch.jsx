export const transformSketch = (dbSketch) => ({
  id: dbSketch.id,
  author: dbSketch.author,
  title: dbSketch.title,
  imagesUrl: dbSketch.images_url,
  description: dbSketch.description,
  publishedAt: dbSketch.published_at,
});
