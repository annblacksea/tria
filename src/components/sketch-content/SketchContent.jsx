import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { selectSketch } from '../../selectors';
import { SectionCard } from '../section-card/SectionCard';
import { Icon } from '../icon/Icon';
import { Carousel } from '../carousel/Carousel';
import { setSketchData } from '../../slices/sketch-slice';

export const SketchContent = ({ sketchId }) => {
  const sketch = useSelector(selectSketch);
  const [fetchSketchError, setFetchSketchError] = useState(null);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();

  useEffect(() => {
    const loadSketch = async () => {
      try {
        const result = await requestServer('fetchSketch', sketchId);

        if (result?.error) {
          setFetchSketchError(result.error);
          return;
        }

        dispatch(setSketchData(result.res));
      } catch (error) {
        setFetchSketchError(error.message);
      }
    };

    loadSketch();
  }, [sketchId, requestServer]);

  return (
    <SectionCard title={sketch.title}>
      {fetchSketchError ? (
        <p className="text-center">{fetchSketchError}</p>
      ) : (
        <div>
          <div>
            <div className="flex justify-between">
              <div>
                <span className="mr-10">{sketch.author}</span>
                <span>{sketch.publishedAt}</span>
              </div>
              <div className="flex gap-3">
                <Icon iconName={'pencil'} text={'Редактировать'} />
                <Icon iconName={'heart'} text={'В избранное'} />
              </div>
            </div>
            <Carousel />
            <p>{sketch.description}</p>
          </div>
        </div>
      )}
    </SectionCard>
  );
};
