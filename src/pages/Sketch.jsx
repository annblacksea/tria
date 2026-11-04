import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAccess, useServerRequest } from './../hooks';
import {
  Comments,
  H2,
  Icon,
  NewCommentForm,
  SectionCard,
  SketchContent,
  SketchForm,
} from '../components';
import { setSketchData } from './../slices/sketch-slice';
import { selectSketch } from './../selectors';
import { ROLE } from '../constants/roles';

export const Sketch = () => {
  const params = useParams();
  const requestServer = useServerRequest();
  const dispatch = useDispatch();
  const [fetchSketchError, setFetchSketchError] = useState(null);
  const sketchId = params.id;
  const sketch = useSelector(selectSketch);
  const isEditing = useMatch('/sketch/:id/edit');
  const navigate = useNavigate();

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
    <>
      <H2 className="sr-only">Этюд</H2>
      <SectionCard title={sketch.title}>
        <div className="flex justify-between">
          <div>
            <span className="mr-10">{sketch.authorLogin}</span>
            <span>{sketch.publishedAt}</span>
          </div>
          {!isEditing && useAccess([ROLE.ADMIN, ROLE.MODERATOR], sketch.authorId) && (
            <div className="flex gap-3">
              <Icon
                iconName={'pencil'}
                text={'Редактировать'}
                onClick={() => navigate(`/sketch/${sketch.id}/edit`)}
              />
              <Icon iconName={'heart'} text={'В избранное'} />
            </div>
          )}
        </div>
        {isEditing ? (
          <SketchForm sketch={sketch} />
        ) : (
          <SketchContent images={sketch.images} description={sketch.description} />
        )}
      </SectionCard>
      {!isEditing && <NewCommentForm sketchId={sketchId} />}
      {!isEditing && <Comments sketchId={sketchId} />}
    </>
  );
};
