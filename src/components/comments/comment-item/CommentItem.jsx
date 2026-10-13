import { useState } from 'react';
import { ROLE } from '../../../constants/roles';
import { useAccess } from '../../../hooks/use-access';
import { Icon } from '../../icon/Icon';
import { TextButton } from '../../buttons/TextButton';
import { useServerRequest } from '../../../hooks';
import { useDispatch } from 'react-redux';
import { deleteCommentData, updateCommentData } from '../../../slices/comments-slice';

export const CommentItem = ({ id, authorId, authorLogin, text, createdAt }) => {
  const canEdit = useAccess([ROLE.ADMIN], authorId);
  const canDelete = useAccess([ROLE.ADMIN, ROLE.MODERATOR], authorId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const requestServer = useServerRequest();
  const dispatch = useDispatch();

  const onSaveEdit = async () => {
    try {
      if (!editedText.trim()) {
        return;
      }
      const responce = await requestServer('saveCommentUpdates', authorId, id, editedText);
      if (!responce) {
        return;
      }
      dispatch(updateCommentData({ id, text: editedText }));
    } catch (error) {
      return error.message;
    } finally {
      setIsEditing(false);
    }
  };

  const onDeleteComment = async () => {
    try {
      const responce = await requestServer('removeComment', authorId, id);
      if (!responce) {
        return;
      }
      dispatch(deleteCommentData(id));
    } catch (error) {
      return error.message;
    }
  };

  return (
    <div className="w-350 bg-[var(--color-background)] rounded-2xl p-7 text-sm">
      <div className="flex justify-between ">
        <span>{authorLogin}</span>
        <span>{createdAt}</span>
      </div>
      {isEditing === true ? (
        <form className="flex flex-col w-full py-4" onSubmit={onSaveEdit}>
          <textarea
            className="w-full p-3 rounded-2xl bg-[#f9f5f5]"
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
