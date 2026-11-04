export const sanitazeContent = (content) =>
  content
    .replaceAll('&nbsp;', ' ')
    .replaceAll('<br>', '\n')
    .replaceAll('<div>', '')
    .replaceAll('</div>', '')
    .trim();
