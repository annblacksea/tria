import { useDispatch, useSelector } from 'react-redux';
import { TextButton } from '../buttons/TextButton';
import { selectModalConfirmData, selectModalIsOpen, selectModalOnConfirm } from './../../selectors';
import { closeModal } from '../../slices/modal-slice';
import { useServerRequest } from '../../hooks';
import { removeCommentAsync } from '../../thunks';
import { useNavigate } from 'react-router-dom';

export const Modal = () => {
  const isOpen = useSelector(selectModalIsOpen);
  const onConfirm = useSelector(selectModalOnConfirm);
  const confirmData = useSelector(selectModalConfirmData);
  const dispatch = useDispatch();
  const requestServer = useServerRequest();
  const navigate = useNavigate();
  let handleConfirm = null;
  let text = '';

  if (!isOpen) {
    return null;
  }

  switch (onConfirm) {
    case 'DELETE_COMMENT':
      handleConfirm = () => {
        dispatch(removeCommentAsync(requestServer, confirmData.authorId, confirmData.id));
        dispatch(closeModal());
      };
      text = 'Вы действительно хотите удалить комментарий?';
      break;

    case 'DELETE_SKETCH':
      handleConfirm = async () => {
        await requestServer('removeSketch', confirmData.ownerId, confirmData.sketchId);

        dispatch(closeModal());
      };
      text = 'Вы действительно хотите удалить этюд?';
      break;

    default:
      dispatch(closeModal());
      break;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex h-[60vh] w-full max-w-200 flex-col justify-between rounded-4xl border border-border-light bg-card-bg p-15 text-main-text shadow-2xl">
        <h3 className="text-center">{text}</h3>
        <div className="flex justify-between mt-auto">
          <TextButton onClick={handleConfirm}>Да</TextButton>
          <TextButton onClick={() => dispatch(closeModal())}>Отмена</TextButton>
        </div>
      </div>
    </div>
  );
};
