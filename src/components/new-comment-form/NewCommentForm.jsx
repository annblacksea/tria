import { useState } from 'react';
import { TextButton } from '../buttons/TextButton';
import { SectionCard } from '../section-card/SectionCard';
import { useAccess, useServerRequest } from '../../hooks';
import { ROLE } from '../../constants/roles';
import { addNewCommentAsync } from '../../thunks/add-new comment-async';
import { useDispatch } from 'react-redux';

export const NewCommentForm = ({ sketchId }) => {
  const [newCommentText, setNewCommentText] = useState('');
  const canSeeNewCommentForm = useAccess([ROLE.ADMIN, ROLE.MODERATOR, ROLE.USER]);
  const requestServer = useServerRequest();
  const dispatch = useDispatch();

  const onNewCommentSave = async (event) => {
    event.preventDefault();

    if (!newCommentText.trim()) {
      return;
    }

    try {
      const addedComment = await dispatch(
        addNewCommentAsync(requestServer, sketchId, newCommentText)
      );

      if (addedComment) {
        setNewCommentText('');
      }
    } catch (error) {
      return error.message;
    }
  };

  return (
    <SectionCard title="Новый комментарий">
      {canSeeNewCommentForm ? (
        <form className="flex flex-col w-full py-4" onSubmit={onNewCommentSave}>
          <textarea
            className=" p-3 rounded-2xl bg-[var(--color-background)] "
            value={newCommentText}
            onChange={(event) => setNewCommentText(event.target.value)}
          />
          <TextButton className="self-end">Отправить</TextButton>
        </form>
      ) : (
        <p>Чтобы оставлять комментарии, пожалуйста, зарегистрируйтесь</p>
      )}
    </SectionCard>
  );
};
