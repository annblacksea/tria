import { Comments, H2, SketchContent } from '../components';
import { useParams } from 'react-router-dom';

export const Sketch = () => {
  const params = useParams();

  return (
    <>
      <H2 className="sr-only">Этюд</H2>
      <SketchContent sketchId={params.id} />
      <Comments sketchId={params.id} />
    </>
  );
};
