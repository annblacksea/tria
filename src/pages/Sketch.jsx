import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
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
import { resetSketchData, setSketchData } from './../slices/sketch-slice';
import { selectSketch } from './../selectors';
import { ROLE } from '../constants/roles';

export const Sketch = () => {
  const params = useParams();
  const requestServer = useServerRequest();
  const dispatch = useDispatch();
  const [fetchSketchError, setFetchSketchError] = useState(null);
  const sketch = useSelector(selectSketch);
  const isEditing = useMatch('/sketch/:id/edit');
  const isCreating = useMatch('/sketch');
  const navigate = useNavigate();
  const whoCanEdit = useAccess([ROLE.ADMIN, ROLE.MODERATOR], sketch.authorId);
  const sketchId = params.id;

  useLayoutEffect(() => {
    dispatch(resetSketchData());
  }, [dispatch, isCreating]);

  useEffect(() => {
    if (isCreating) {
      return;
    }

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
  }, [sketchId, requestServer, isCreating, isEditing, sketchId, dispatch]);

  return (
    <>
      <H2 className="sr-only">Этюд</H2>
      <SectionCard title={sketch.title}>
        <div className="flex justify-between">
          <div>
            <span className="mr-10">{sketch.authorLogin}</span>
            <span>{sketch.publishedAt}</span>
          </div>
          {!isCreating && !isEditing && whoCanEdit && (
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
        {isEditing || isCreating ? (
          <SketchForm sketch={sketch} />
        ) : (
          <SketchContent images={sketch.images} description={sketch.description} />
        )}
      </SectionCard>
      {!isCreating && !isEditing && <NewCommentForm sketchId={sketchId} />}
      {!isCreating && !isEditing && <Comments sketchId={sketchId} />}
    </>
  );
};
