import { useState } from 'react';
import { ROLE } from '../../../constants/roles';
import { useAccess } from '../../../hooks/use-access';
import { Icon } from '../../icon/Icon';
import { TextButton } from '../../buttons/TextButton';
import { useServerRequest } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { updateCommentAsync } from '../../../thunks/update-comment-async';
import { openModal } from '../../../slices/modal-slice';

export const CommentItem = ({ id, authorId, authorLogin, text, createdAt }) => {
  const canEdit = useAccess([ROLE.ADMIN], authorId);
  const canDelete = useAccess([ROLE.ADMIN, ROLE.MODERATOR], authorId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const requestServer = useServerRequest();
  const dispatch = useDispatch();

  const onSaveEdit = async (event) => {
    event.preventDefault();

    try {
      if (!editedText.trim()) {
        return;
      }
      const updated = await dispatch(updateCommentAsync(requestServer, authorId, id, editedText));
      if (!updated) {
        return;
      }
    } catch (error) {
      return error.message;
    } finally {
      setIsEditing(false);
    }
  };

  const onDeleteComment = async () => {
    await dispatch(
      openModal({
        onConfirm: 'DELETE_COMMENT',
        confirmData: { id, authorId },
      })
    );
    // await dispatch(removeCommentAsync(requestServer, authorId, id));
  };

  return (
    <div className="w-350 rounded-2xl border border-border-light bg-card-bg p-7 text-sm text-main-text">
      <div className="flex justify-between ">
        <span>{authorLogin}</span>
        <span>{createdAt}</span>
      </div>
      {isEditing === true ? (
        <form className="flex flex-col w-full py-4" onSubmit={onSaveEdit}>
          <textarea
            className="w-full rounded-2xl border border-border-light bg-background p-3 text-main-text focus:outline-none focus:ring-2 focus:ring-accent"
            value={editedText}
            onChange={(event) => setEditedText(event.target.value)}
          />
          <TextButton className="self-end">Сохранить</TextButton>
        </form>
      ) : (
        <div>
          <p className="py-4">{text}</p>
          <div className="flex justify-end gap-3">
            {canEdit && (
              <Icon
                iconName={'pencil'}
                text={'Редактировать комментарий'}
                onClick={() => setIsEditing(true)}
              />
            )}
            {canDelete && (
              <Icon iconName={'trash'} text={'Удалить комментарий'} onClick={onDeleteComment} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
