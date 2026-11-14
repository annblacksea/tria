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
        <form
          className="flex w-full flex-col rounded-2xl bg-background p-4 transition-colors duration-300"
          onSubmit={onNewCommentSave}
        >
          <textarea
            className="rounded-2xl border border-border-light bg-card-bg p-3 text-main-text focus:outline-none focus:ring-2 focus:ring-accent"
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
