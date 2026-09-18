import { useDispatch, useSelector } from 'react-redux';
import { SectionCard } from '../section-card/SectionCard';
import { selectComments } from '../../selectors';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import { setCommentsData } from '../../slices/comments-slice';

export const Comments = ({ sketchId }) => {
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();
  const [fetchCommentsError, setFetchCommentsError] = useState(null);
  const requestServer = useServerRequest();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const result = await requestServer('fetchComments', sketchId);
        if (result?.error) {
          setFetchCommentsError(result.error);
          return;
        }
        console.log('result.res', result.res);

        dispatch(setCommentsData(result.res));
      } catch (error) {
        setFetchCommentsError(error.message);
      }
    };

    loadComments();

    console.log('Comments', comments);
  }, [sketchId, requestServer]);

  return (
    <SectionCard title="Комментарии">
      <ul>
        {comments.map(({ id, text }) => (
          <li key={id}>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};
