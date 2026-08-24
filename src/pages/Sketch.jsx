import { useDispatch, useSelector } from 'react-redux';
import { Carousel, H2, SectionCard, SketchContent } from '../components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useServerRequest } from '../hooks';
import { setSketchData } from '../slices/sketch-slice';
import { selectSketch } from '../selectors';

export const Sketch = () => {
  const sketch = useSelector(selectSketch);
  const [fetchSketchError, setFetchSketchError] = useState(null);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const params = useParams();

  useEffect(() => {
    const loadSketch = async () => {
      try {
        const result = await requestServer('fetchSketch', params.id);

        if (result?.error) {
          setFetchSketchError(result.error);
          return;
        }

        dispatch(setSketchData(result.res));
        console.log(sketch);
      } catch (error) {
        setFetchSketchError(error.message);
      }
    };

    loadSketch();
  }, [params.id, requestServer]);

  console.log(sketch);

  return (
    <SectionCard title={sketch.title}>
      {fetchSketchError ? (
        <p className="text-center">{fetchSketchError}</p>
      ) : (
        <SketchContent
          text={sketch.description}
          author={sketch.author}
          publishedAt={sketch.publishedAt}
        />
      )}
    </SectionCard>
  );
};
